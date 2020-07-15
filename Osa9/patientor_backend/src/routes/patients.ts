import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.newPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      throw e;
    }
  }
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientsService.getPatient(req.params.id);
    res.json(patient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      throw e;
    }
  }
});

export default router;