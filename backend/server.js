const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const roleRoutes = require('./routes/roles');
const alertRoutes = require('./routes/alertRoutes');
const alertTypeRoutes = require('./routes/alertTypeRoutes');
const documentRoutes = require('./routes/documentRoutes');
const preferencesRoutes = require('./routes/preferencesRoutes');
// const adminAlertRoutes = require('./routes/adminAlertRoutes');






// ... other route imports

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../public'));

mongoose.connect(process.env.MONGO_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// ... add other role routes
// backend/server.js
app.use('/api/roles', roleRoutes);

app.use('/api/alerts', alertRoutes);

app.use('/api/alert-types', alertTypeRoutes);

app.use('/api/documents', documentRoutes);

app.use('/api/preferences', preferencesRoutes);

// app.use('/api/admin/alerts', adminAlertRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

