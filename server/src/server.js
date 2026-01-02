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
// Use one-level up to reach `/app/web` in the container (when server is in /app/src)
app.use(express.static(path.join(__dirname, '../web')));

const model = new AccountModel();
const presenter = new Presenter(model);

// Simple health
app.get('/api/health', (req, res) => res.json({status: 'ok'}));

// List accounts
app.get('/api/accounts', (req, res) => {
  res.json(model.getAllAccounts());
});

// Transactions history
app.get('/api/transactions', (req, res) => {
  res.json(model.getTransactions());
});

// Export CSV
app.get('/api/export', (req, res) => {
  const txs = model.getTransactions();
  const headers = ['id','from','to','amount','currency','timestamp'];
  const csv = [headers.join(',')]
    .concat(txs.map(t => headers.map(h => JSON.stringify(t[h] || '')).join(','))).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');
  res.send(csv);
});

// Clear history
app.post('/api/transactions/clear', (req, res) => {
  model.clearTransactions();
  res.json({ success: true });
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
