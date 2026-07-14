import { prisma } from "../../prisma";

interface DetailOrderProps {
  order_id: string;
}

export class DetailOrderService {
  async execute({ order_id }: DetailOrderProps) {
    try {
      const order = await prisma.order.findUnique({
        where: {
          id: order_id,
        },
        select: {
          id: true,
          table: true,
          status: true,
          draft: true,
          name: true,
          createdAt: true,
          updatedAt: true,
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

      if (!order) {
        throw new Error("Pedido não encontrado!");
      }

      return order;
    } catch (err) {
      throw err;
    }
  }
}
