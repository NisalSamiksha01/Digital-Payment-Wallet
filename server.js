const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/walletDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and Model
const UserSchema = new mongoose.Schema({
  username: String,
  balance: Number,
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/api/register', async (req, res) => {
  const { username } = req.body;
  const user = new User({ username, balance: 0 });
  await user.save();
  res.send('User registered');
});

app. post('/api/deposit', async (req, res) => {
  const { username, amount } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    user.balance += amount;
    await user.save();
    res.send('Deposit successful');
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
