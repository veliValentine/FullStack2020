import express from 'express';
const app = express();

import { parseArgsData, calculateBmi } from './bmiCalculators';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseArgsData(['_', '_', `${req.query.height}`, `${req.query.weight}`])
    const bmi = calculateBmi(height, weight)
    res.json({ weight, height, bmi })
  } catch (e) {
    res.status(400).json({ error: 'malformatted parameters' })
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})