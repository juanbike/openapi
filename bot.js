const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 4500;

const openaiApiKey = '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';

app.use(bodyParser.json());

app.post('/gpt3', async (req, res) => {
  try {
    // Obtén el mensaje del usuario desde la solicitud de Gupshup
    const userMessage = req.body.message.text;

    // Llama a la API de OpenAI con el mensaje del usuario
    const response = await axios.post('https://api.openai.com/v1/engines/gpt-4-1106-preview/completions', {
        //'https://api.openai.com/v1/engines/text-davinci-003/completions
      prompt: userMessage,
      max_tokens: 150,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
    });

    // Extrae la respuesta de GPT-3.5
    const botReply = response.data.choices[0].text.trim();

    // Envía la respuesta al usuario a través de Gupshup
    res.json({
      messages: [{ text: botReply }],
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
