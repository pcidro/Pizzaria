import { AddIOtemOrderService } from "../../services/order/AddItemOrderService";

import { Request, Response } from "express";

export class AddItemController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;

    const addItem = new AddIOtemOrderService();
    const item = await addItem.execute({ order_id, product_id, amount });

    return res.status(201).json(item);
  }
}
