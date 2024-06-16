export const tgiMultiSet = {
  default: {
    strategy: 'none',
    params: {
      max_tokens: 1000,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  },
  extraction: {
    strategy: 'none',
    params: {
      max_tokens: 1000,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  },
  math: {
    strategy: 'none',
    params: {
      max_tokens: 1000,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  },
  reasoning: {
    strategy: 'none',
    params: {
      max_tokens: 500,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  },
  humanities: {
    strategy: 'none',
    params: {
      max_tokens: 1500,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  }
}
