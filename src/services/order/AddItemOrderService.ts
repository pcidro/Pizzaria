import { prisma } from "../../prisma";

interface ItemProps {
  order_id: string;
  product_id: string;
  amount: number;
}

export class AddIOtemOrderService {
  async execute({ order_id, product_id, amount }: ItemProps) {
    try {
      const orderExists = await prisma.order.findUnique({
        where: {
          id: order_id,
        },
      });

      if (!orderExists) {
        throw new Error("Order não encontrada!");
      }

      const productExists = await prisma.product.findUnique({
        where: {
          id: product_id,
          disabled: false,
        },
      });

      if (!productExists) {
        throw new Error("Produto não encontrado!");
      }

      const item = await prisma.item.create({
        data: {
          order_id,
          product_id,
          amount,
        },
        select: {
          id: true,
          order_id: true,
          product_id: true,
          amount: true,
          createdAt: true,
          updatedAt: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return item;
    } catch (err) {
      throw err;
    }
  }
}
