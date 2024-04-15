import express from 'express';
import productController from './controllers/productController.js';
import testController from './controllers/testController.js';
import authController from './controllers/authController.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const router = express.Router();

router.use(cors());
router.use(cookieParser());

router.get('/signin', authController.signin);
router.get('/test', testController.test);
router.get('/', productController.list);
router.get('/product/:id', productController.details);

export default router;