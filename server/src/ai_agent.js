const axios = require('axios');

class AIAgent {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || null;
  }

  async generateAdvice(context) {
    // If OPENAI_API_KEY is provided, call OpenAI; otherwise return a rule-based reply
    if (!this.apiKey) {
      // 简单示例：基于交易上下文返回建议
      if (context.intent === 'transfer' && context.amount > 1000) {
        return `注意：向 ${context.to} 转账 ${context.amount} ${context.currency}，请确认是否为大额交易。`; 
      }
      return `已收到请求：${context.intent}。处理摘要：${JSON.stringify(context)}。`;
    }

    // 调用 OpenAI（ChatCompletions） - 使用较简单的 POST 请求示例
    const prompt = `You are a helpful banking assistant. The user intent: ${context.intent}. Context: ${JSON.stringify(context)}. Provide short, clear advice.`;

    const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: 'You are a helpful banking assistant.' }, { role: 'user', content: prompt }],
      max_tokens: 200
    }, {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });

    return resp.data.choices[0].message.content.trim();
  }
}

module.exports = AIAgent;