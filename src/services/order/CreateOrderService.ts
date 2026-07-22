import { prisma } from "../../prisma";

interface CreateOrderProps {
  table: number;
  name?: string;
}

export class CreateOrderService {
  async execute({ table, name }: CreateOrderProps) {
    try {
      const order = await prisma.order.create({
        data: {
          table,
          name: name || "",
          draft: false,
        },
        select: {
          id: true,
          table: true,
          draft: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return order;
    } catch (err) {
      throw err;
    }
  }
}
