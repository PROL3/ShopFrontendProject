import express from 'express';
import { basketController } from '../controllers/basket.controller';

const router = express.Router();

router.get('/', basketController.getAll);
router.delete('/:id', basketController.deleteItem);
router.put('/:id', basketController.editItem);
router.post('/', basketController.addItem);

export = router;