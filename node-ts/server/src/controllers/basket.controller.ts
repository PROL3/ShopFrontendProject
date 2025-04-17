import { NextFunction, Request, Response } from 'express';
import { addItem, deleteItem, editItem, getBasket } from '../services/basket.service';

export const basketController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const basket = await getBasket();
            res.status(200).json(basket);
        } catch (error) {
            next(error);
        }
    },

    addItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await addItem(req.body);
            res.status(201).json({ message: 'המוצר נוסף לסל בהצלחה' });
        } catch (error) {
            next(error);
        }
    },

    deleteItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const success = await deleteItem(+req.params.id);
            if (success) {
                res.status(200).json({ message: 'המוצר הוסר מהסל' });
            } else {
                res.status(404).json({ message: 'המוצר לא נמצא בסל' });
            }
        } catch (error) {
            next(error);
        }
    },

    editItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await editItem(+req.params.id, req.body);
            res.status(200).json({ message: 'המוצר עודכן בהצלחה' });
        } catch (error) {
            next(error);
        }
    }
};
