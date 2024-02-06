import express, { NextFunction, Request, Response } from "express";
import { PrismaService } from "../prisma.service";
import { BalikpapanService } from "./balikpapan.service";
import { BalikpapanGuard } from "./balikpapan.guard";

const prismaService = new PrismaService();
const balikpapanService = new BalikpapanService(prismaService);
const balikpapanGuard = new BalikpapanGuard();
const balikpapanRouter = express.Router();

interface CustomRequest extends Request {
  id?: number;
}

const authenticationMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = String(
      req.headers["authorization"]?.split(" ")[1].replace("'", "")
    );
    const decodedToken = balikpapanGuard.authentication(token);
    if (decodedToken) {
      req.id = decodedToken.id;
      next();
    } else {
        req.id = 0;
        res.status(401).json("Unauthorized!");
    }
  } catch (err) {
    req.id = 0;
    res.status(500).json("Error authenticating!");
  }
};

balikpapanRouter.get(
  "/nik/:nik",
  authenticationMiddleware,
  async (req, res) => {
    try {
      const response = await balikpapanService.getBalikpapanDataByNIK(
        req.params.nik
      );
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json("Internal server error!");
    }
  }
);

export { balikpapanRouter };