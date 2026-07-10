import { prisma } from "../../prisma";

interface CreateCategoryProps {
  name: string;
}

export class CreateCategoryService {
  async execute({ name }: CreateCategoryProps) {
    try {
      const category = await prisma.category.create({
        data: {
          name: name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });
      return category;
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao criar uma categoria");
    }
  }
}
