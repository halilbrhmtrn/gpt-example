
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || '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',
});
const openai = new OpenAIApi(configuration);
const app = express();

app.use(express.json());

app.post('/extract-intent', async (req, res) => {
  let { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required and should be a string' });
  }
  message += getResponseStructureMessage();

  const gpt4Response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: message,
    max_tokens: 400,
    temperature: 0.7,
  });

  const resp = JSON.parse(gpt4Response.data.choices[0].text);
  console.log(resp);

  let datetimeStr = resp.datetimeStr;
  datetimeStr = new Date(datetimeStr).toISOString();

  const response = {
    intent: resp.intent === 'new_appointment' ? 'new_appointment' : 'other',
    datetimeStr,
  };

  res.json(response);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('API server is running on port 3000');
  });
}

const getResponseStructureMessage = () => {
  return `
  The expected response should be a JSON object with the following structure:
  {
    "intent": "new_appointment | other",
    "datetimeStr": "YYYY-MM-DDTHH:mm:ss"
  }
  Please extract both relative and absolute time and date. Take into account expressions like "bugün" (today), "yarın" (tomorrow), "bu Cuma" (this Friday), "30 Temmuz" (30th July), and similar. Keep in mind the timezone of the server.
  The current time on the server is: ${new Date().toISOString()}. If the intent is not "new_appointment," the value of datetimeStr should be null.  
  `;
}
module.exports = app;