import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Name is required" });
    }

    const CreateCategory = new CreateCategoryService();
    const category = await CreateCategory.execute({
      name,
    });
    res.status(201).json(category);
  }
}
