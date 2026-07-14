import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Nome inválido!" }),
    price: z
      .string()
      .min(1, { message: "Preço inválido!" })
      .regex(/^[0-9]+$/, { message: "Preço inválido!" }),
    description: z.string().min(1, { message: "Descrição inválida!" }),
    category_id: z.string().min(1, { message: "Categoria inválida!" }),
  }),
});

export const listProductSchema = z.object({
  query: z.object({
    disabled: z
      .enum(["true", "false"], {
        error: "O parâmetro disabled deve ser 'true' ou 'false'",
      })
      .optional()
      .default("false")
      .transform((val) => val === "true"),
  }),
});

export const listProductByCategorySchema = z.object({
  query: z.object({
    category_id: z.string().min(1, { message: "O category_id é obrigatório" }),
  }),
});
