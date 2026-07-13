import { Request, Response } from "express";
import { DeleteProductService } from "../../services/products/DeleteProductService";

export class DeleteProductController {
  async handle(req: Request, res: Response) {
    const id = req.query.id as string;

    const deleteProduct = new DeleteProductService();
    const product = await deleteProduct.execute({ id: id });

    return res
      .status(200)
      .json({ message: "Produto deletado/arquivado com sucesso!", product });
  }
}
