import { Request, Response } from "express";

import { SendOrderService } from "../../services/order/SendOrderService";

export class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, name } = req.body;

    const sendOrder = new SendOrderService();
    const result = await sendOrder.execute({ order_id, name });

    return res.status(200).json(result);
  }
}
