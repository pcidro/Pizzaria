import { prisma } from "../../prisma";

interface ListProductProps {
  disabled?: boolean;
}

export class ListProductService {
  async execute({ disabled }: ListProductProps) {
    const products = await prisma.product.findMany({
      where: {
        disabled,
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
  }
}
