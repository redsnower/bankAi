class AccountModel {
  constructor() {
    // 简单内存数据，示例用途
    this.accounts = {
      'alice': { balance: 1000, currency: 'USD' },
      'bob': { balance: 500, currency: 'USD' }
    };
    // keep a simple transaction history in-memory for demo purposes
    this.transactions = [];
  }

  getAccount(user) {
    const acc = this.accounts[user];
    if (!acc) throw new Error('Account not found');
    return { user, ...acc };
  }

  getAllAccounts() {
    return Object.entries(this.accounts).map(([user, v]) => ({ user, ...v }));
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

    return { from: this.getAccount(from), to: this.getAccount(to), tx };
  }
}

module.exports = AccountModel;
