import { prisma } from "../../prisma";

interface CreateProductProps {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

export class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: CreateProductProps) {
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        banner,
        category_id,
      },
    });
    return product;
  }
}
