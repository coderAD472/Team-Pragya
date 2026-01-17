#!/bin/bash

echo ""
echo "================================================"
echo "    AI Website Builder - Test Setup"
echo "================================================"
echo ""
echo "This will start both the Flask backend and React frontend in MOCK MODE"
echo "(No API credentials needed for testing)"
echo ""
echo ""

# Start Flask backend
echo "Starting Flask Backend on port 5000..."
python flask_backend.py &
FLASK_PID=$!

sleep 3

# Start React frontend
echo "Starting React Frontend on port 5173..."
npm run dev &
REACT_PID=$!

echo ""
echo "================================================"
echo "✅ Both servers are starting!"
echo ""
echo "📍 Frontend:  http://localhost:5173"
echo "📍 Backend:   http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "================================================"
echo ""

# Wait for both processes
wait
