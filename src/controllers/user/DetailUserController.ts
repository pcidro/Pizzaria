import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const DetailUserControler = new DetailUserService();
    const user = await DetailUserControler.execute(user_id);
    return res.json(user);
  }
}
