import { NextFunction, Request, Response } from 'express';
import { addUser, getAllUsers, getUserAvg, getUsersOlderThenAge, updateUserAge } from '../services/user.service';
import { usersStub } from '../stub/user.stub';
import { validUser } from '../validations/user.validation';

export const userController = {
    getAll: (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = getAllUsers();
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    },
    getAgeAvg: (req: Request, res: Response, next: NextFunction) => {
        try {
            const avgAge = getUserAvg();
            res.status(200).json({ averageAge: avgAge });
        } catch (error) {
            next(error)
        }
    },
    addUser: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { age, name } = req.body;
            if (!age || !name) throw new Error('must provide age and name');
            validUser(req.body);

            addUser(name, age);
            res.status(201).json(usersStub);
        } catch (error) {
            next(error);
        }
    },
    getUsersAboveAge: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { age } = req.body;
            if (!age) throw new Error('must provide an age');
            validUser(req.body);

            const matchedUsers = getUsersOlderThenAge(age);
            res.status(200).json(matchedUsers);
        } catch (error) {
            next(error);
        }
    },
    updateUserAge: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { age, name } = req.body;
            if (!age || !name) throw new Error('must provide age and name')
            validUser(req.body);

            const isChanged = updateUserAge(name, age);
            if (!isChanged) throw new Error('user not found');
            res.status(201).json(usersStub)
        } catch (error) {
            next(error);
        }
    }
};
