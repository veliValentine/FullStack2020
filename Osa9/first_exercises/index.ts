import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculators';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight)) || Number(height) === 0) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }
  const bmi = calculateBmi(Number(height), Number(weight))
  return res.json({ weight, height, bmi })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})