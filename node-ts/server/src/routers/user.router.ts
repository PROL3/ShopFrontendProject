import express, { NextFunction, Request, Response } from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    console.info(12, 'Call to USERS API', {
        method: req.method,
        originalUrl: req.originalUrl,
        body: req.body
    });
    next();
});

router.get("/", userController.getAll);
router.get("/get-age-avg", userController.getAgeAvg);
router.post('/', userController.addUser);
router.get('/age', userController.getUsersAboveAge);
router.put('/:name', userController.updateUserAge);

export = router;