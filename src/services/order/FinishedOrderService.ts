import { prisma } from "../../prisma";

interface FinishedOrderServiceProps {
  status: string;
}

export class FinishedOrderService {
  async execute({ status }: FinishedOrderServiceProps) {
    try {
      const orders = await prisma.order.findMany({
        where: {
          status: status === "true" ? true : false,
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

      if (!orders) {
        throw new Error("Pedidos não encontrados!");
      }

      return orders;
    } catch (err) {
      throw err;
    }
  }
}
