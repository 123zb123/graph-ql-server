const typeDefs = `#graphql
    type Product {
        product_id: ID
        name: String!
        sale_price: Float!
        quantity: Int!
        description: String!
        category: String!
        discount_percentage: Float!
        image_url: String!
        image_alt: String!
        is_for_sale: Boolean!
        cost_price: Float!
        supplier: String!
    }

    input InputProduct {
        product_id: ID
        name: String!
        sale_price: Float!
        quantity: Int!
        description: String!
        category: String!
        discount_percentage: Float!
        image_url: String!
        image_alt: String!
        is_for_sale: Boolean!
        cost_price: Float!
        supplier: String!
    }

    type UpdateOrDeleteProduct {
        status: String!
        message: String!
        success: String
    }

    type GetProductsResult {
        message: String
        products: [Product]
        status: Int
    }

    type GetProductByIdResult {
        message: String
        status: Int
        product: Product
    }

    type AddProductResult {
        message: String
        status: Int
        product: Product
    }

    input AddProduct {
        product_id: String
        name: String
        sale_price: Float
        quantity: Int
        description: String
        category: String
        discount_percentage: Float
        image_url: String
        image_alt: String
        is_for_sale: Boolean
        cost_price: Float
        supplier: String
    }
    input UpdateProduct {
        product_id: String
        name: String
        sale_price: Float
        quantity: Int
        description: String
        category: String
        discount_percentage: Float
        image_url: String
        image_alt: String
        is_for_sale: Boolean
        cost_price: Float
        supplier: String
}


`;

const typesQuery = `#graphql
    type Query {
        getProducts: GetProductsResult
        getProductById(id: ID!): GetProductByIdResult
    }

    type Mutation {
        addProduct(product: AddProduct): AddProductResult
        updateProduct(id:ID, product: UpdateProduct): UpdateOrDeleteProduct
        deleteProduct(id: ID): UpdateOrDeleteProduct
    }
`;

const productsTypes = typeDefs + typesQuery;

export default productsTypes;
