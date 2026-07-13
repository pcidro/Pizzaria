import { Request, Response } from "express";
import { ListProductService } from "../../services/products/ListProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    const disabled =
      req.query.disabled === "true"
        ? true
        : req.query.disabled === "false"
          ? false
          : undefined;

    const listProduct = new ListProductService();

    const products = await listProduct.execute({
      disabled: disabled ?? false,
    });

    res.status(200).json(products);
  }
}

export { ListProductController };
