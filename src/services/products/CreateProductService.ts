import { cloudinary } from "../../config/cloudinary";
import { prisma } from "../../prisma";
import { Readable } from "node:stream";

interface CreateProductProps {
  name: string;
  price: string;
  description: string;
  category_id: string;
  imageBuffer: Buffer;
  imageName: string;
}

export class CreateProductService {
  async execute({
    name,
    price,
    description,
    imageBuffer,
    imageName,
    category_id,
  }: CreateProductProps) {
    const categoryExists = await prisma.category.findFirst({
      where: { id: category_id },
    });
    if (!categoryExists) {
      throw new Error("Categoria não encontrada");
    }

    let bannerUrl = "";

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "pizzaria",
            resource_type: "image",
            public_id: `${Date.now()}-${imageName.split(".")[0]}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          },
        );
        const bufferStream = Readable.from(imageBuffer);
        bufferStream.pipe(uploadStream);
      });

      bannerUrl = result.secure_url;
    } catch (error) {
      console.log(error);
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        banner: bannerUrl,
        category_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        category_id: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return product;
  }
}
