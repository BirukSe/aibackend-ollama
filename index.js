import express from 'express';
import ollama from 'ollama';
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(cors()); // Allow frontend access

app.post('/ask-query', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await ollama.chat({
      model: 'llama3.2',
      messages: [{ role: 'user', content: query }],
    });

    const reply = response?.message?.content || 'No response from the model';
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Error interacting with the model' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
