
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://aniket021978:aniket021978@cluster0.8zslwh8.mongodb.net/IP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userDataSchema = new mongoose.Schema({
  currentSavings: Number,
  yearlyContribution: Number,
  expectedReturn: Number,
  duration: Number,
});

const UserData = mongoose.model('UserData', userDataSchema);

app.post('/api/saveUserData', async (req, res) => {
  try {
    const userData = new UserData(req.body);
    await userData.save();
    res.status(201).send(userData);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
