const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const AccountModel = require('./model');
const Presenter = require('./presenter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend static files from the web/ folder at project root
app.use(express.static(path.join(__dirname, '../../web')));

const model = new AccountModel();
const presenter = new Presenter(model);

// Simple health
app.get('/api/health', (req, res) => res.json({status: 'ok'}));

// List accounts
app.get('/api/accounts', (req, res) => {
  res.json(model.getAllAccounts());
});

// Perform an action via presenter (acts as the "View")
app.post('/api/action', async (req, res) => {
  const { user, intent, params } = req.body;
  try {
    const result = await presenter.handle(user, intent, params);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Bank AI server running on port ${port}`);
});
