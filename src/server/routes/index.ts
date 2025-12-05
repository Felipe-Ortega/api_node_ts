import { Router } from 'express';
import {CidadesController} from './../controllers';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Deu certo');
});

router.post('/cidades',CidadesController.create);




export { router };