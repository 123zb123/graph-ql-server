import { AdminProductInterface } from "./products.interface";

export const selectAllProducts = `
SELECT
  "product_id",
  "is_for_sale",
  "cost_price",
  "supplier",
  "name",
  "sale_price",
  "quantity",
  "description",
  "category",
  "discount_percentage",
  "image_url",
  "image_alt"
FROM
  "inventory_products"
`;

export function selectProductByIdQuery(id: string): string {
    const selectById = `
          SELECT
            "product_id",
            "is_for_sale",
            "cost_price",
            "supplier",
            "name",
            "sale_price",
            "quantity",
            "description",
            "category",
            "discount_percentage",
            "image_url",
            "image_alt"
          FROM
            "inventory_products"
          WHERE 
            "product_id" = ${id};
        `;
    return selectById;
}

export function insertProductQuery(product:AdminProductInterface) {
  
  const insertProduct = `
  INSERT INTO "inventory_products" (
    "is_for_sale",
    "cost_price",
    "supplier",
    "name",
    "sale_price",
    "quantity",
    "description",
    "category",
    "discount_percentage",
    "image_url",
    "image_alt"
  ) VALUES (
    ${product.is_for_sale},
    ${product.cost_price},
    '${product.supplier}',
    '${product.name}',
    ${product.sale_price},
    ${product.quantity},
    '${product.description}',
    '${product.category}',
    ${product.discount_percentage},
    '${product.image_url}',
    '${product.image_alt}'
  ) RETURNING *; 
`;

  
    return insertProduct;
  }
  
  export function updateProductQuery(id: string, product: AdminProductInterface): string {
    const updateFields: string[] = [];
  
    if (product.is_for_sale !== undefined) updateFields.push(`"is_for_sale" = ${product.is_for_sale}`);
    if (product.cost_price !== undefined) updateFields.push(`"cost_price" = ${product.cost_price}`);
    if (product.supplier !== undefined) updateFields.push(`"supplier" = '${product.supplier}'`);
    if (product.name !== undefined) updateFields.push(`"name" = '${product.name}'`);
    if (product.sale_price !== undefined) updateFields.push(`"sale_price" = ${product.sale_price}`);
    if (product.quantity !== undefined) updateFields.push(`"quantity" = ${product.quantity}`);
    if (product.description !== undefined) updateFields.push(`"description" = '${product.description}'`);
    if (product.category !== undefined) updateFields.push(`"category" = '${product.category}'`);
    if (product.discount_percentage !== undefined) updateFields.push(`"discount_percentage" = ${product.discount_percentage}`);
    if (product.image_url !== undefined) updateFields.push(`"image_url" = '${product.image_url}'`);
    if (product.image_alt !== undefined) updateFields.push(`"image_alt" = '${product.image_alt}'`);
  
    const updateProduct = `
      UPDATE "inventory_products"
      SET
        ${updateFields.join(',\n')}
      WHERE "product_id" = ${id}
      RETURNING *; 
    `;
  
    return updateProduct;
  }
  
  
export function deleteProductQuery(id: string): string {
    const deleteProduct = `
      DELETE FROM "inventory_products"
      WHERE "product_id" = ${id}
      RETURNING "product_id";
    `;

    return deleteProduct;
  }
  