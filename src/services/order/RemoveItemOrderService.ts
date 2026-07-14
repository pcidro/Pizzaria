import { prisma } from "../../prisma";

interface RemoveItemOrderProps {
  item_id: string;
}

export class RemoveItemOrderService {
  async execute({ item_id }: RemoveItemOrderProps) {
    try {
      const itemExists = await prisma.item.findUnique({
        where: {
          id: item_id,
        },
      });

      if (!itemExists) {
        throw new Error("Item não encontrado!");
      }

      await prisma.item.delete({
        where: {
          id: item_id,
        },
      });

      return { message: "Item removido com sucesso!" };
    } catch (err) {
      throw err;
    }
  }
}
