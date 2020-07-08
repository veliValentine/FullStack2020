import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

import diagnosesRoute from './routes/diagnoses';
import patientRoute from './routes/patients';

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('PING PONG');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});