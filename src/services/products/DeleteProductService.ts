import { prisma } from "../../prisma";

interface DeleteProductProps {
  id: string;
}

export class DeleteProductService {
  async execute({ id }: DeleteProductProps) {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!product) {
        throw new Error("Produto não encontrado!");
      }

      await prisma.product.update({
        where: {
          id,
        },
        data: {
          disabled: true,
        },
      });

      return { message: "Produto deletado/arquivado com sucesso!" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido ao deletar produto!");
    }
  }
}
