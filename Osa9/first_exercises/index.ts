import express from 'express';
const app = express();

app.use(express.json());

import { calculateBmi } from './bmiCalculators';
import { calculateExercises } from './exerciseCalculators';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight)) || Number(height) === 0) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  interface data {
    target: number;
    daily_exercises: Array<number>;
  }
  const body = req.body as data;
  const target = body.target;
  const dailyExercises = body.daily_exercises;

  if (!target || !dailyExercises) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  //check that it is number.      It is an array.                           Inside the array is only numbers.          Array contains something.
  if (isNaN(Number(target)) || !Array.isArray(dailyExercises) || dailyExercises.some((e) => isNaN(Number(e))) || dailyExercises.length === 0) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const response = calculateExercises(dailyExercises, target);
  return res.json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});