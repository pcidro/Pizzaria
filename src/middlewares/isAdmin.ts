import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";

export async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = req.user_id;

  if (!user_id) {
    res.status(401).json({
      error: "Usuário não autenticado",
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    res.status(404).json({
      error: "Usuário não encontrado",
    });
    return;
  }

  if (user.role !== "ADMIN") {
    res.status(403).json({
      error: "Usuário sem permissão",
    });
    return;
  }

  return next();
}
