#!/bin/bash
# SWDe5ign Local Demo Server
# Run this script to preview the website locally

PORT=8000

echo "======================================"
echo "  SWDe5ign - Local Demo Server"
echo "======================================"
echo ""
echo "Starting server on port $PORT..."
echo ""
echo "Open your browser and visit:"
echo "  http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo "======================================"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m http.server $PORT
else
    echo "Error: Python is not installed. Please install Python 3 to run the demo server."
    exit 1
fi
