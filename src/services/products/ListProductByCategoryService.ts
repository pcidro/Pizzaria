import { prisma } from "../../prisma";

interface ListProductByCategoryProps {
  category_id: string;
}

export class ListProductByCategoryService {
  async execute({ category_id }: ListProductByCategoryProps) {
    try {
      const categoryExists = await prisma.category.findUnique({
        where: {
          id: category_id,
        },
      });

      if (!categoryExists) {
        throw new Error("Category not found");
      }

      const products = await prisma.product.findMany({
        where: {
          category_id,
          disabled: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          category_id: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      return products;
    } catch (err) {
      throw err;
    }
  }
}
