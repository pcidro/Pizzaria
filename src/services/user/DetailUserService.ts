import { prisma } from "../../prisma/index";

export class DetailUserService {
  async execute(user_id: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: user_id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (err) {
      throw new Error("Usuário não encontrado");
    }
  }
}
