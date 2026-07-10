import { Request, Response } from "express";

import { CreateProductService } from "../../services/products/CreateProductService";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, banner, category_id } = req.body;
    if (!name || !price || !description || !banner || !category_id) {
      res.status(400).json({ error: "Todos os campos são necessários!" });
    }
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      price,
      description,
      banner,
      category_id,
    });
    res.status(201).json(product);
  }
}
