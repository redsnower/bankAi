const fs = require('fs');
const path = require('path');

class AccountModel {
  constructor() {
    // 简单内存数据，示例用途
    this.accounts = {
      'alice': { balance: 1000, currency: 'USD' },
      'bob': { balance: 500, currency: 'USD' }
    };
    // persistent transactions stored in data/transactions.json
    this.dbPath = path.join(__dirname, '../../data/transactions.json');
    this.transactions = this.loadTransactions();
  }

  getAccount(user) {
    const acc = this.accounts[user];
    if (!acc) throw new Error('Account not found');
    return { user, ...acc };
  }

  getAllAccounts() {
    return Object.entries(this.accounts).map(([user, v]) => ({ user, ...v }));
  }

  loadTransactions() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const raw = fs.readFileSync(this.dbPath, 'utf8');
        return JSON.parse(raw || '[]');
      }
    } catch (e) { /* ignore and start fresh */ }
    return [];
  }

  saveTransactions() {
    try {
      fs.mkdirSync(path.dirname(this.dbPath), { recursive: true });
      fs.writeFileSync(this.dbPath, JSON.stringify(this.transactions, null, 2), 'utf8');
    } catch (e) { console.error('Failed to save transactions:', e.message); }
  }

  getTransactions() {
    // return most recent first
    return this.transactions.slice().reverse();
  }

  transfer(from, to, amount) {
    if (!this.accounts[from] || !this.accounts[to]) throw new Error('Invalid account');
    if (amount <= 0) throw new Error('Amount must be positive');
    if (this.accounts[from].balance < amount) throw new Error('Insufficient funds');

    // perform balances
    this.accounts[from].balance -= amount;
    this.accounts[to].balance += amount;

    // create a transaction record
    const tx = {
      id: Date.now().toString(),
      from,
      to,
      amount,
      currency: this.accounts[to].currency,
      timestamp: new Date().toISOString()
    };
    this.transactions.push(tx);
    this.saveTransactions();

    return { from: this.getAccount(from), to: this.getAccount(to), tx };
  }

  clearTransactions() {
    this.transactions = [];
    this.saveTransactions();
  }
}

module.exports = AccountModel;

module.exports = AccountModel;
