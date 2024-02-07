import { PrismaService } from "../prisma.service";

export class BalikpapanService {
  constructor(private prisma: PrismaService) {}

  async getAllBalikpapanData() {
    try {
      const response = await this.prisma.balikpapan.findMany();
      if (response.length === 0) {
        return {
          code: 404,
          response: "Data is not found!"
        };
      }
      return {
        code: 200,
        response: response
      }
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!"
      }
    }
  }

  async getBalikpapanDataByNIK(nik: string) {
    try {
      const response = await this.prisma.balikpapan.findUnique({
        where: {
          nik: nik,
        },
      });
      if (!response) {
        return {
          code: 404,
          message: "Data is not found!",
        };
      }
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }

  async getBalikpapanDataByNKK(nkk: string) {
    try {
      const response = await this.prisma.balikpapan.findMany({
        where: {
          nkk: nkk,
        },
      });
      if (!response) {
        return {
          code: 404,
          response: "Data is not found!",
        };
      }
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }

  async getBalikpapanDataByRT(rt: string, kel: string, kec: string) {
    try {
      const response = await this.prisma.$queryRaw`SELECT * FROM balikpapan WHERE rt = ${rt} AND kel = ${kel} AND kec = ${kec} LIMIT 1`
      if (!response) {
        return {
          code: 404,
          response: "Data is not found!",
        };
      }
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }

  // async getBalikpapanDataByKelurahan(kel: string) {
  //   try {
  //     const response = await this.prisma.balikpapan.findMany({
  //       where: {
  //         kel: kel,
  //       },
  //     });
  //     if (!response) {
  //       return {
  //         code: 404,
  //         response: "Data is not found!",
  //       };
  //     }
  //     return {
  //       code: 200,
  //       response: response,
  //     };
  //   } catch (err) {
  //     return {
  //       code: 500,
  //       response: "Internal server error!",
  //     };
  //   }
  // }

  // async getBalikpapanDataByKecamatan(kec: string) {
  //   try {
  //     const response = await this.prisma.balikpapan.findMany({
  //       where: {
  //         kec: kec,
  //       },
  //     });
  //     if (!response) {
  //       return {
  //         code: 404,
  //         response: "Data is not found!",
  //       };
  //     }
  //     return {
  //       code: 200,
  //       response: response,
  //     };
  //   } catch (err) {
  //     return {
  //       code: 500,
  //       response: "Internal server error!",
  //     };
  //   }
  // }
}
