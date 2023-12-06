export interface AdminProductInterface {
    product_id?: string;
    name: string;
    sale_price: number;
    quantity: number;
    description: string;
    category: string;
    discount_percentage: number;
    image_url: string;
    image_alt: string;
    is_for_sale: boolean; 
    cost_price: number;
    supplier: string;
}

export type CreateProductRequest = Omit<AdminProductInterface, 'product_id'>;
export type UpdateProductRequest = Partial<AdminProductInterface>;

