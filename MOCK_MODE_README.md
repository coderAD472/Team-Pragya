# 🚀 AI Website Builder - MOCK MODE SETUP

## ✨ What's Ready

Your app is now set up to run in **MOCK MODE** without needing API credentials!

- ✅ React Frontend with Vite
- ✅ Flask Backend with mock responses
- ✅ Firebase auth with mock login
- ✅ Gemini API with mock code generation
- ✅ Local storage for saving projects

---

## 🎮 How to Run

### **Option 1: Double-Click (Windows)**
Simply double-click: `start-dev.bat`

This will automatically start both servers in separate windows.

### **Option 2: Manual Start (Windows/Mac/Linux)**

**Terminal 1 - Start Backend:**
```bash
python flask_backend.py
```
You should see:
```
⚠️ Running in MOCK MODE - Using test data instead of Gemini API
🚀 Flask Backend Starting...
📍 Running on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
You should see:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### **Open in Browser**
Visit: **http://localhost:5173**

---

## 🧪 Test Features

### 1. **Login**
- Click "Sign in with Google"
- You'll be logged in as "Test User" (no Google account needed)

### 2. **Generate Code**
- Enter any website idea (e.g., "A dark theme portfolio")
- Click "Generate Website"
- Get a mock React component

### 3. **Validate Code**
- Click "Validate for Deployment"
- Get mock validation results

### 4. **Deploy**
- Click "Deploy Now"
- Project is saved to browser's local storage

### 5. **View Projects**
- All your projects appear in "My Projects" (right panel)
- Projects are stored locally (disappear on browser cache clear)

---

## 📝 Features in Mock Mode

### What Works
- ✅ User login/logout
- ✅ Generate mock React components
- ✅ Validate code (mock validation)
- ✅ Save projects locally
- ✅ View saved projects
- ✅ Download generated code
- ✅ Full UI/UX testing

### What Needs Real API Keys
- ❌ Actual Gemini API code generation
- ❌ Real Firebase authentication
- ❌ Cloud project storage

---

## 🔑 Add Real API Keys Later

When ready to use real APIs, edit `.env`:

```env
GEMINI_API_KEY=your_real_key_from_google
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then restart both servers - they'll automatically use real APIs!

---

## 🛠️ Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use:

**For Port 5000 (Flask):**
Edit `flask_backend.py` line 273:
```python
app.run(debug=True, port=5001)  # Change to any available port
```

**For Port 5173 (Vite):**
Edit `vite.config.js`:
```javascript
server: {
  port: 5174,  // Change to any available port
}
```

### `npm` or `python` not found
- Install Node.js: https://nodejs.org (includes npm)
- Install Python: https://python.org

### Module not found errors
Run these commands:
```bash
npm install
pip install -r requirements.txt
```

---

## 📊 Project Structure

```
hackathon/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx    # Main app interface
│   │   └── Login.jsx        # Login screen
│   ├── App.jsx              # Root component
│   ├── firebase.js          # Auth & storage (mock-enabled)
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind CSS
├── flask_backend.py         # API server (mock-enabled)
├── .env                     # API credentials (add your keys)
├── start-dev.bat            # Quick start for Windows
├── start-dev.sh             # Quick start for Mac/Linux
├── package.json             # Node dependencies
└── index.html               # HTML entry point
```

---

## 🎯 Next Steps

1. **Test the full flow** in mock mode
2. **Get API credentials** when ready:
   - Firebase: https://console.firebase.google.com
   - Gemini: https://aistudio.google.com/app/apikey
3. **Add credentials to `.env`**
4. **Switch to production mode**

---

## 💡 Tips

- Projects are stored in **browser local storage** (survives page refreshes)
- Clear browser cache to delete saved projects
- Check browser console (F12) for debug info
- Check terminal for server logs

---

**Happy Testing! 🎉**

Questions? Check `PROJECT_REVIEW.md` for more details.
