import { prisma } from "../../prisma";

export type Period = "today" | "7days" | "30days";

interface FinishedOrderServiceProps {
  status: string;
  period: Period;
}

function getStartDate(period: Period) {
  const startDate = new Date();

  startDate.setHours(0, 0, 0, 0);

  if (period === "7days") {
    startDate.setDate(startDate.getDate() - 6);
  }

  if (period === "30days") {
    startDate.setDate(startDate.getDate() - 29);
  }

  return startDate;
}

export class FinishedOrderService {
  async execute({ status, period }: FinishedOrderServiceProps) {
    try {
      const startDate = getStartDate(period);
      const orders = await prisma.order.findMany({
        where: {
          status: status === "true" ? true : false,
          finishedAt: {
            gte: startDate,
          },
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
