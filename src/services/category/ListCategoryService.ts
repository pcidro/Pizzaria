import { prisma } from "../../prisma";

export class ListCategoryService {
  async execute() {
    try {
      const categories = await prisma.category.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return categories;
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      throw new Error("Não foi possível listar as categorias.");
    }
  }
}
