const Presenter = require('../src/presenter');
const AccountModel = require('../src/model');

jest.mock('../src/ai_agent', () => {
  return jest.fn().mockImplementation(() => ({ generateAdvice: (c) => Promise.resolve('mock advice') }));
});

test('check balance', async () => {
  const model = new AccountModel();
  const presenter = new Presenter(model);
  const res = await presenter.handle('alice', 'check_balance');
  expect(res.account.user).toBe('alice');
});

test('transfer success', async () => {
  const model = new AccountModel();
  const presenter = new Presenter(model);
  const res = await presenter.handle('alice', 'transfer', { to: 'bob', amount: 100 });
  expect(res.transaction.from.balance).toBe(900);
  expect(res.transaction.to.balance).toBe(600);
  expect(res.advice).toBe('mock advice');
});