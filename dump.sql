
CREATE TABLE admin_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL  
);

CREATE TABLE inventory_products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sale_price NUMERIC NOT NULL,
    quantity INTEGER NOT NULL,
    description TEXT,
    category VARCHAR(255),
    discount_percentage NUMERIC,
    image_url TEXT,
    image_alt VARCHAR(255),
    is_for_sale BOOLEAN,
    cost_price NUMERIC,
    supplier TEXT
);
-- Insert data into products table
INSERT INTO inventory_products (name, sale_price, quantity, description, category, discount_percentage, image_url, image_alt, cost_price, is_for_sale, supplier)
VALUES 
  ('iPhone 9', 549, 94, 'An apple mobile which is nothing like ''apple''', 'smartphones', 12.96, 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', 'iPhone 9 Image Alt', 400, true, 'Supplier A'),
  ('iPhone X', 899, 34, 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', 'smartphones', 17.94, 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', 'iPhone X Image Alt', 600, true, 'Supplier B'),
  ('Samsung Universe 9', 1249, 36, 'Samsung''s new variant which goes beyond Galaxy to the Universe', 'smartphones', 15.46, 'https://i.dummyjson.com/data/products/3/thumbnail.jpg', 'Samsung Universe 9 Image Alt', 1000, true, 'Supplier C'),
  ('OPPOF19', 280, 123, 'OPPO F19 is officially announced on April 2021.', 'smartphones', 17.91, 'https://i.dummyjson.com/data/products/4/thumbnail.jpg', 'OPPOF19 Image Alt', 200, true, 'Supplier D'),
  ('Huawei P30', 499, 32, 'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.', 'smartphones', 10.58, 'https://i.dummyjson.com/data/products/5/thumbnail.jpg', 'Huawei P30 Image Alt', 350, true, 'Supplier E'),
  ('MacBook Pro', 1749, 83, 'MacBook Pro 2021 with mini-LED display may launch between September, November', 'laptops', 11.02, 'https://i.dummyjson.com/data/products/6/thumbnail.png', 'MacBook Pro Image Alt', 1500, true, 'Supplier F'),
  ('Samsung Galaxy Book', 1499, 50, 'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched', 'laptops', 4.15, 'https://i.dummyjson.com/data/products/7/thumbnail.jpg', 'Samsung Galaxy Book Image Alt', 1200, true, 'Supplier G'),
  ('Microsoft Surface Laptop 4', 1499, 68, 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.', 'laptops', 10.23, 'https://i.dummyjson.com/data/products/8/thumbnail.jpg', 'Microsoft Surface Laptop 4 Image Alt', 1200, true, 'Supplier H'),
  ('Infinix INBOOK', 1099, 96, 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty', 'laptops', 11.83, 'https://i.dummyjson.com/data/products/9/thumbnail.jpg', 'Infinix INBOOK Image Alt', 900, true, 'Supplier I'),
  ('HP Pavilion 15-DK1056WM', 1099, 89, 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', 'laptops', 6.18, 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', 'HP Pavilion 15-DK1056WM Image Alt', 900, true, 'Supplier J'),
  ('perfume Oil', 13, 65, 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', 'fragrances', 8.4, 'https://i.dummyjson.com/data/products/11/thumbnail.jpg', 'perfume Oil Image Alt', 10, true, 'Supplier K'),
  ('Brown Perfume', 40, 52, 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', 'fragrances', 15.66, 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', 'Brown Perfume Image Alt', 25, true, 'Supplier L'),
  ('Fog Scent Xpressio Perfume', 13, 61, 'Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men', 'fragrances', 8.14, 'https://i.dummyjson.com/data/products/13/thumbnail.webp', 'Fog Scent Xpressio Perfume Image Alt', 10, true, 'Supplier M'),
  ('Non-Alcoholic Concentrated Perfume Oil', 120, 114, 'Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil', 'fragrances', 15.6, 'https://i.dummyjson.com/data/products/14/thumbnail.jpg', 'Non-Alcoholic Concentrated Perfume Oil Image Alt', 80, true, 'Supplier N'),
  ('Eau De Perfume Spray', 30, 105, 'Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality', 'fragrances', 10.99, 'https://i.dummyjson.com/data/products/15/thumbnail.jpg', 'Eau De Perfume Spray Image Alt', 20, true, 'Supplier O'),
  ('Hyaluronic Acid Serum', 19, 110, 'L''OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid', 'skincare', 13.31, 'https://i.dummyjson.com/data/products/16/thumbnail.jpg', 'Hyaluronic Acid Serum Image Alt', 15, true, 'Supplier P'),
  ('Tree Oil 30ml', 12, 78, 'Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,', 'skincare', 4.09, 'https://i.dummyjson.com/data/products/17/thumbnail.jpg', 'Tree Oil 30ml Image Alt', 8, true, 'Supplier Q'),
  ('Oil Free Moisturizer 100ml', 40, 88, 'Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.', 'skincare', 13.1, 'https://i.dummyjson.com/data/products/18/thumbnail.jpg', 'Oil Free Moisturizer 100ml Image Alt', 30, true, 'Supplier R'),
  ('Skin Beauty Serum.', 46, 54, 'Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m', 'skincare', 10.68, 'https://i.dummyjson.com/data/products/19/thumbnail.jpg', 'Skin Beauty Serum. Image Alt', 35, true, 'Supplier S'),
  ('Freckle Treatment Cream- 15gm', 70, 140, 'Fair & Clear is Pakistan''s only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.', 'skincare', 16.99, 'https://i.dummyjson.com/data/products/20/thumbnail.jpg', 'Freckle Treatment Cream- 15gm Image Alt', 60, true, 'Supplier T'),
  ('- Daal Masoor 500 grams', 20, 133, 'Fine quality Branded Product Keep in a cool and dry place', 'groceries', 4.81, 'https://i.dummyjson.com/data/products/21/thumbnail.png', '- Daal Masoor 500 grams Image Alt', 5, true, 'Supplier U'),
  ('Elbow Macaroni - 400 gm', 14, 146, 'Product details of Bake Parlor Big Elbow Macaroni - 400 gm', 'groceries', 15.58, 'https://i.dummyjson.com/data/products/22/thumbnail.jpg', 'Elbow Macaroni - 400 gm Image Alt', 3, true, 'Supplier V'),
  ('Orange Essence Food Flavou', 14, 26, 'Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item', 'groceries', 8.04, 'https://i.dummyjson.com/data/products/23/thumbnail.jpg', 'Orange Essence Food Flavou Image Alt', 5, true, 'Supplier W'),
  ('cereals muesli fruit nuts', 46, 113, 'original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji', 'groceries', 16.8, 'https://i.dummyjson.com/data/products/24/thumbnail.jpg', 'cereals muesli fruit nuts Image Alt', 35, true, 'Supplier X'),
  ('Gulab Powder 50 Gram', 70, 47, 'Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds', 'groceries', 13.58, 'https://i.dummyjson.com/data/products/25/thumbnail.jpg', 'Gulab Powder 50 Gram Image Alt', 25, true, 'Supplier Y'),
  ('Plant Hanger For Home', 41, 131, 'Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf', 'home-decoration', 17.86, 'https://i.dummyjson.com/data/products/26/thumbnail.jpg', 'Plant Hanger For Home Image Alt', 20, true, 'Supplier Z'),
  ('Flying Wooden Bird', 51, 17, 'Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm', 'home-decoration', 15.58, 'https://i.dummyjson.com/data/products/27/thumbnail.webp', 'Flying Wooden Bird Image Alt', 15, true, 'Supplier AA'),
  ('3D Embellishment Art Lamp', 20, 54, '3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)', 'home-decoration', 16.49, 'https://i.dummyjson.com/data/products/28/thumbnail.jpg', '3D Embellishment Art Lamp Image Alt', 25, true, 'Supplier BB'),
  ('Handcraft Chinese style', 60, 7, 'Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate', 'home-decoration', 15.34, 'https://i.dummyjson.com/data/products/29/thumbnail.webp', 'Handcraft Chinese style Image Alt', 50, true, 'Supplier CC'),
  ('Key Holder', 30, 54, 'Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality', 'home-decoration', 2.92, 'https://i.dummyjson.com/data/products/30/thumbnail.jpg', 'Key Holder Image Alt', 15, true, 'Supplier DD');

CREATE TABLE user_login_timestamps (
    login_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES admin_users(user_id),
    login_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION log_user_login()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_login_timestamps (user_id)
  VALUES (NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER admin_users_login_trigger
AFTER INSERT ON admin_users
FOR EACH ROW
EXECUTE FUNCTION log_user_login();


SELECT
  DATE(login_timestamp) AS login_date,
  COUNT(*) AS login_count
FROM
  user_login_timestamps
GROUP BY
  login_date
ORDER BY
  login_date;
