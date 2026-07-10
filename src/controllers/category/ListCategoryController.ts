import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

export class ListCategoryController {
  async handle(req: Request, res: Response) {
    const listCategoryService = new ListCategoryService();
    const categories = await listCategoryService.execute();

    res.status(200).json(categories);
  }
}
