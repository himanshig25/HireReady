# HireReady 🚀

An AI-powered resume optimizer that helps job seekers tailor their resumes for specific job descriptions and improve ATS compatibility.

## 🌐 Live Demo
[https://hire-ready-beta.vercel.app](https://hire-ready-beta.vercel.app)

## ✨ Features

- 📄 Upload resume (PDF/DOCX)
- 🤖 AI-powered ATS score analysis
- 🔍 Missing & matching keywords detection
- 💡 Smart suggestions to improve resume
- 📊 Analysis history dashboard
- 🔐 Secure authentication with JWT

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Groq AI API (Llama 3.3)
- Multer (file upload)

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- Groq API Key

### Installation

1. Clone the repo
```bash
git clone https://github.com/himanshig25/HireReady.git
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd client
npm install
```

4. Create `.env` in server folder
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key

5. Run the app
```bash
# Terminal 1 - Backend
cd server
node index.js

# Terminal 2 - Frontend
cd client
npm start
```

## 📁 Project Structure
HireReady/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/   # Register, Login, Dashboard, Optimize, History
│   │   └── components/ # Navbar, ProtectedRoute
└── server/          # Node.js backend
├── models/      # User, Analysis
└── routes/      # auth, resume, analyze

## 👩‍💻 Developer

**Himanshi Gangwar**
- GitHub: [@himanshig25](https://github.com/himanshig25)