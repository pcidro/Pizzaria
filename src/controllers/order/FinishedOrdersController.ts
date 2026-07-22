import { Request, Response } from "express";
import { FinishedOrderService } from "../../services/order/FinishedOrderService";
import type { Period } from "../../services/order/FinishedOrderService";

export class FinishedOrderController {
  async handle(req: Request, res: Response) {
    const status = req.query.status as string;
    const period = req.query.period as Period;

    const finishedOrder = new FinishedOrderService();
    const order = await finishedOrder.execute({ status, period });

    return res.status(200).json(order);
  }
}
