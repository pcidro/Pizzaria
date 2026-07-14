import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

export class ListOrderController {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined;

    const listOrders = new ListOrderService();
    const orders = await listOrders.execute({ draft });

    return res.status(200).json(orders);
  }
}
