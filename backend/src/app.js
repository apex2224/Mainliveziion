require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const path = require('path');
const otpRoutes = require('./routes/otpRoutes');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const authRoutes = require('./routes/authRoutes');
const generalRoutes = require('./routes/generalRoutes');
const chatRoutes = require('./routes/chatRoutes');
const domainRoutes = require('./routes/domainRoutes');
const planRoutes = require("./routes/PlanRoutes");
const errorHandler = require('./middleware/errorMiddleware');
const visitorRoutes = require("./routes/visitorRoutes");
const studentRoutes = require('./routes/studentRoutes');
const careerRoutes = require('./routes/careerRoutes');

const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/', generalRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/domain', domainRoutes);
app.use('/api/otp', otpRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/visitor", visitorRoutes);
app.use('/api', studentRoutes);
app.use('/api/careers', careerRoutes);

// ✅ Serve React frontend static files (production)
const frontendBuildPath = path.join(__dirname, '../../Frontend/build');
app.use(express.static(frontendBuildPath));

// ✅ SPA Fallback — all unknown routes serve index.html so React Router handles them
// This fixes: direct navigation, page refresh on any route
app.get('*', (req, res) => {
  // Only fallback for non-API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
