import express from 'express';
import productController from './controllers/productController.js';
import cors from 'cors';

const router = express.Router();

router.use(cors());
router.get('/', productController.list);
router.get('/product/:id', productController.details);

export default router;