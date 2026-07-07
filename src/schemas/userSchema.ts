import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.email({ message: "Email inválido!" }),
    password: z
      .string({ message: "É necessário informar uma senha" })
      .min(6, { message: "A senha deve ter no minimo 6 caracteres" })
      .regex(/[A-Z]/, {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[a-z]/, {
        message: "A senha deve conter pelo menos uma letra minúscula",
      })
      .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" }),
  }),
});
