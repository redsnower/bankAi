class AccountModel {
  constructor() {
    // 简单内存数据，示例用途
    this.accounts = {
      'alice': { balance: 1000, currency: 'USD' },
      'bob': { balance: 500, currency: 'USD' }
    };
  }

  getAccount(user) {
    const acc = this.accounts[user];
    if (!acc) throw new Error('Account not found');
    return { user, ...acc };
  }

  getAllAccounts() {
    return Object.entries(this.accounts).map(([user, v]) => ({ user, ...v }));
  }

  transfer(from, to, amount) {
    if (!this.accounts[from] || !this.accounts[to]) throw new Error('Invalid account');
    if (amount <= 0) throw new Error('Amount must be positive');
    if (this.accounts[from].balance < amount) throw new Error('Insufficient funds');
    this.accounts[from].balance -= amount;
    this.accounts[to].balance += amount;
    return { from: this.getAccount(from), to: this.getAccount(to) };
  }
}

module.exports = AccountModel;
