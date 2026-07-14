import { prisma } from "../../prisma";

interface sendOrderProps {
  order_id: string;
  name: string;
}

export class SendOrderService {
  async execute({ order_id, name }: sendOrderProps) {
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
          draft: false,
          name: name,
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
      console.log(err);
      throw err;
    }
  }
}
