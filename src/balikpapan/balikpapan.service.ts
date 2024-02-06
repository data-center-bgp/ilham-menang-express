import { PrismaService } from "../prisma.service";

export class BalikpapanService {
  constructor(private prisma: PrismaService) {}

  async getBalikpapanDataByNIK(nik: string) {
    try {
        const response = await this.prisma.balikpapan.findMany({
            where: {
                nik: nik
            }
        });
        if (!response) {
            return {
                code: 404,
                message: "Data is not found!"
            };
        }
        return {
            code: 200,
            response: response
        };
    } catch (err) {
        return {
            code: 500,
            response: "Internal server error!"
        }
    }
  }
}