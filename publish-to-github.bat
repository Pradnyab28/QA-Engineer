@echo off
setlocal
echo ==============================================================
echo Pradnya Bapte Portfolio - 1-Click GitHub Publisher
echo ==============================================================
echo.
set /p REPO_URL="Enter or paste your GitHub Repository URL: "
if "%REPO_URL%"=="" (
    echo Error: No URL provided. Please run again and paste your GitHub repository URL.
    pause
    exit /b 1
)

echo Connecting to GitHub repository: %REPO_URL% ...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo ==============================================================
echo Finished! Your portfolio is now pushed to GitHub.
echo Next step: Open https://vercel.com/new and click "Import" on this repo!
echo ==============================================================
pause
