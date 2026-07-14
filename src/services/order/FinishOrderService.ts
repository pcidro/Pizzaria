import { prisma } from "../../prisma";

interface FinishOrderProps {
  order_id: string;
}

export class FinishOrderService {
  async execute({ order_id }: FinishOrderProps) {
    try {
      const order = await prisma.order.findUnique({
        where: {
          id: order_id,
        },
      });

      if (!order) {
        throw new Error("Pedido não encontrado!");
      }

      const orderUpdate = await prisma.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
        select: {
          id: true,
          table: true,
          status: true,
          draft: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return orderUpdate;
    } catch (err) {
      throw err;
    }
  }
}
