@echo off
echo.
echo ================================================
echo    AI Website Builder - Test Setup
echo ================================================
echo.
echo This will start both the Flask backend and React frontend in MOCK MODE
echo (No API credentials needed for testing)
echo.
echo.
echo Starting Flask Backend on port 5000...
echo.
start "Flask Backend" cmd /k "cd %cd% && python flask_backend.py"

timeout /t 3

echo.
echo Starting React Frontend on port 5173...
echo.
start "React Frontend" cmd /k "cd %cd% && npm run dev"

echo.
echo ================================================
echo ✅ Both servers are starting!
echo.
echo 📍 Frontend:  http://localhost:5173
echo 📍 Backend:   http://localhost:5000
echo.
echo Press any key to close this window...
echo ================================================
echo.
pause
