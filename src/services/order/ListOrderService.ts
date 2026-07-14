import { prisma } from "../../prisma";

interface listOrderServiceProps {
  draft?: string;
}

export class ListOrderService {
  async execute({ draft }: listOrderServiceProps) {
    const orders = await prisma.order.findMany({
      where: {
        draft: draft === "true" ? true : false,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        table: true,
        status: true,
        draft: true,
        name: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            amount: true,
            product_id: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }
}
