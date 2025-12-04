import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = Router();

router.get('/', (req, res) => {
  return res.send('Deu certo');
});




router.post('/teste', (req, res) => {
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});




export { router };