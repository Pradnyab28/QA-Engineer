@echo off
title Pradnya Bapte Portfolio - Local Dev Server
echo ==============================================================
echo Starting Pradnya Bapte - QA Engineer Portfolio
echo Opening in default browser at http://localhost:5173 ...
echo ==============================================================
start "" "http://localhost:5173"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 5173
pause
