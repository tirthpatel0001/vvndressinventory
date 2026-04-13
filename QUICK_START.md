# QUICK START GUIDE

## ⚡ 30-Second Setup

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```

### Login
```
Username: admin123
Password: admin123
```

---

## 📍 What to Do First

1. **Get MongoDB Password** → Replace in `backend/.env`
2. **Install Dependencies** → Run `npm install` in both backend and frontend
3. **Start Backend** → `npm start` in backend folder (port 5000)
4. **Start Frontend** → `npm start` in frontend folder (port 3000)
5. **Login** → Use admin123 / admin123

---

## ✅ Verification Checklist

- [ ] Backend running on https://vvndressinventory.onrender.com
- [ ] Frontend running on http://localhost:3000
- [ ] MongoDB connected (check + in backend console)
- [ ] Login works with admin123 / admin123
- [ ] Can see Dashboard with inventory table
- [ ] Can add new items
- [ ] Can create orders
- [ ] Can view and return orders

---

## 🚨 If something doesn't work:

1. **Check MongoDB Password** in `backend/.env`
2. **Check Ports** → Make sure 5000 and 3000 are available
3. **Check Console Errors** → Look at browser console and terminal
4. **Restart Services** → Kill and restart both backend and frontend

---

## 📞 API Health Check

Open browser and visit:
- Backend Health: https://vvndressinventory.onrender.com/api/health
- Should show: `{"message":"Server is running!"}`

---

Need more details? See README.md in project root!
