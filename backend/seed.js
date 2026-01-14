const mongoose = require('mongoose');
const Role = require('./models/Role');
require('dotenv').config();
const AlertType = require('./models/AlertType');

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // await Role.insertMany([
  //   { role_id: 1, role_name: 'Admin' },
  //   { role_id: 2, role_name: 'Manager' },
  //   { role_id: 3, role_name: 'User' }
  // ]);

  await AlertType.insertMany([
    { alert_type_id: 1, name: 'SMS', description: 'Send a text message via phone number' },
    { alert_type_id: 2, name: 'Push notification', description: 'Sends a notification in the website' }
  ]);

  console.log('Seeded roles and alert types');
  process.exit();
};

seedData();
