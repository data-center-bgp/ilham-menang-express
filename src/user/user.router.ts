import express, { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma.service';
import { UserAuth } from './user.auth.service';
import { UserGuard } from './user.guard';

const prismaService = new PrismaService();
const userAuth = new UserAuth(prismaService);
const userGuard = new UserGuard();
const userRouter = express.Router();

interface CustomRequest extends Request {
    id: number;
}

userRouter.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await userAuth.register(req.body);
        res.status(response.code).json(response.response);
    } catch (err) {
        next(err);
    }
});

userRouter.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await userAuth.login(req.body);
        res.status(response.code).json(response.response);
    } catch (err) {
        next(err);
    }
});

export { userRouter }