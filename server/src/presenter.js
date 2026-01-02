const AIAgent = require('./ai_agent');

class Presenter {
  constructor(model) {
    this.model = model;
    this.agent = new AIAgent();
  }

  async handle(user, intent, params = {}) {
    switch (intent) {
      case 'check_balance':
        return { success: true, account: this.model.getAccount(user) };
      case 'transfer':
        const { to, amount } = params;
        const tx = this.model.transfer(user, to, amount);
        const advice = await this.agent.generateAdvice({ intent, from: user, to, amount, currency: tx.to.currency });
        return { success: true, transaction: tx, advice };
      case 'advice':
        const reply = await this.agent.generateAdvice({ intent, user, params });
        return { success: true, advice: reply };
      default:
        throw new Error('Unknown intent');
    }
  }
}

module.exports = Presenter;