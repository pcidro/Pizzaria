import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ error: "O número da mesa é obrigatório" })
      .int({ message: "O número da mesa deve ser um inteiro" })
      .min(1, { message: "O número da mesa deve ser maior que zero" }),
    name: z.string().optional(),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    order_id: z.string({ error: "O ID do pedido é obrigatório" }),
    product_id: z.string({ error: "O ID do produto é obrigatório" }),
    amount: z
      .number({ error: "A quantidade é obrigatória" })
      .int({ message: "A quantidade deve ser um inteiro" })
      .min(1, { message: "A quantidade deve ser maior que zero" }),
  }),
});

export const removeItemOrderSchema = z.object({
  query: z.object({
    item_id: z.string({ error: "O ID do item é obrigatório" }),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z.string({ error: "O ID do pedido é obrigatório" }),
  }),
});

