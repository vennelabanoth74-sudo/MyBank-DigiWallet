const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let users = [{ username: 'priya', password: 'priya123' }];
let wallets = { 'Wallet 1': 0 };

app.post('/api/register', (req, res) => {
  users.push(req.body);
  res.json({ message: 'User ' + req.body.username + ' registered - My Bank' });
});

app.post('/api/login', (req, res) => {
  const user = users.find(u => u.username.toLowerCase() === req.body.username.toLowerCase());
  if (!user) return res.status(404).json({ message: 'User not found - kumar example' });
  res.json({ message: 'Login successful - priya example' });
});

app.post('/api/wallet/load', (req, res) => {
  wallets[req.body.walletId] = (wallets[req.body.walletId] || 0) + parseInt(req.body.amount);
  res.json({ message: 'Money added', newBalance: wallets[req.body.walletId] });
});

app.post('/api/fraud-check', (req, res) => {
  if (req.body.amount <= 50000) {
    res.json({ amount: req.body.amount, status: 'SAFE', message: '1000-SAFE example' });
  } else {
    res.json({ amount: req.body.amount, status: 'FRAUD', message: '100000-FRAUD example' });
  }
});

app.get('/', (req, res) => res.send('MyBank Backend Running'));
app.listen(5000, () => console.log('Backend running'));
