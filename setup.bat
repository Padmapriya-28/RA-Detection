@echo off
echo ====================================================
echo AI-Based Rheumatoid Arthritis Detection System
echo Quick Start Setup Script
echo ====================================================
echo.

echo [1/4] Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)
echo.

echo [2/4] Creating virtual environment...
if not exist "venv" (
    python -m venv venv
    echo Virtual environment created successfully!
) else (
    echo Virtual environment already exists.
)
echo.

echo [3/4] Activating virtual environment...
call venv\Scripts\activate
echo.

echo [4/4] Installing dependencies...
echo This may take a few minutes on first run...
pip install -r requirements.txt
echo.

echo ====================================================
echo Setup Complete!
echo ====================================================
echo.
echo To run the application:
echo 1. Make sure virtual environment is activated
echo 2. Run: python app.py
echo 3. Open browser: http://127.0.0.1:5000
echo.
echo Press any key to start the application now...
pause > nul

echo.
echo Starting RA Detection System...
python app.py
