param (
    [int]$Port = 5173
)

$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"

try {
    $listener.Prefixes.Add($prefix)
    $listener.Start()
} catch {
    $Port = 3000
    $prefix = "http://localhost:$Port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Output "PORTFOLIO_SERVER_STARTED: http://localhost:$Port/"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".pdf"  = "application/pdf"
    ".json" = "application/json"
    ".ico"  = "image/x-icon"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".webp" = "image/webp"
    ".woff2"= "font/woff2"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relPath = $request.Url.LocalPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        if ([string]::IsNullOrEmpty($relPath)) {
            $relPath = "index.html"
        }

        $filePath = Join-Path $root $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }
            
            $response.ContentType = $contentType
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Cache-Control", "no-cache")
            
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    } catch {
        # Continue loop on aborted client requests
    }
}
