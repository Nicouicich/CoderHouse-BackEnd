import {Router} from 'express';
import { devolverAleatorios } from '../controllers/products-test';

const router = Router();

router.get('/', devolverAleatorios)


export {router};