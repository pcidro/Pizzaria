import { Request, Response } from "express";
import { FinishedOrderService } from "../../services/order/FinishedOrderService";

export class FinishedOrderController {
  async handle(req: Request, res: Response) {
    const status = req.query.status as string;

    const finishedOrder = new FinishedOrderService();
    const order = await finishedOrder.execute({ status });

    return res.status(200).json(order);
  }
}
