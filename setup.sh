#!/bin/bash
# AI-Based Rheumatoid Arthritis Detection System
# Quick Start Setup Script for Linux/Mac

echo "===================================================="
echo "AI-Based Rheumatoid Arthritis Detection System"
echo "Quick Start Setup Script"
echo "===================================================="
echo ""

echo "[1/4] Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8+ from your package manager"
    exit 1
fi
python3 --version
echo ""

echo "[2/4] Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created successfully!"
else
    echo "Virtual environment already exists."
fi
echo ""

echo "[3/4] Activating virtual environment..."
source venv/bin/activate
echo ""

echo "[4/4] Installing dependencies..."
echo "This may take a few minutes on first run..."
pip install -r requirements.txt
echo ""

echo "===================================================="
echo "Setup Complete!"
echo "===================================================="
echo ""
echo "To run the application:"
echo "1. Activate virtual environment: source venv/bin/activate"
echo "2. Run: python app.py"
echo "3. Open browser: http://127.0.0.1:5000"
echo ""
echo "Press Enter to start the application now..."
read

echo ""
echo "Starting RA Detection System..."
python app.py
