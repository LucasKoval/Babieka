/*** GRUPO 1 - BABIEKA ***/
-- {**********/ STRUCTURE /**********}

CREATE SCHEMA babieka_db;
USE babieka_db;

-- [TABLAS]
CREATE TABLE roles (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	value INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE categories (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE types (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME 
);

CREATE TABLE colors (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    hex VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME 
);

CREATE TABLE images (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME 
);

CREATE TABLE sizes (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    number DECIMAL UNSIGNED NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME 
);

CREATE TABLE discounts (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    number INT UNSIGNED DEFAULT 0,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME 
);

CREATE TABLE models (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    category_id INT UNSIGNED NOT NULL,
    type_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    color_id INT UNSIGNED NOT NULL,
    image_id INT UNSIGNED NOT NULL,
    base TINYINT UNSIGNED,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME 
);

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    role_id INT UNSIGNED NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE products (
	id INT(6) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    model_id INT UNSIGNED NOT NULL,
    size_id INT UNSIGNED NOT NULL,
    discount_id INT UNSIGNED,
    stock INT UNSIGNED,
    price DECIMAL UNSIGNED NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE items (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    model_name VARCHAR(255) NOT NULL,
    model_description VARCHAR(255),
    model_image VARCHAR(255),
    unit_price INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    subtotal INT UNSIGNED NOT NULL,
    status INT UNSIGNED NOT NULL,
    order_id INT UNSIGNED,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
    );

CREATE TABLE orders (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    order_number INT UNSIGNED,
    total INT UNSIGNED NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

-- [RELACIONES]
ALTER TABLE users
ADD FOREIGN KEY (role_id) REFERENCES roles(id);

ALTER TABLE models
ADD FOREIGN KEY (category_id) REFERENCES categories(id);

ALTER TABLE models
ADD FOREIGN KEY (type_id) REFERENCES types(id);

ALTER TABLE models
ADD FOREIGN KEY (color_id) REFERENCES colors(id);

ALTER TABLE models
ADD FOREIGN KEY (image_id) REFERENCES images(id);

ALTER TABLE products
ADD FOREIGN KEY (model_id) REFERENCES models(id);

ALTER TABLE products
ADD FOREIGN KEY (size_id) REFERENCES sizes(id);

ALTER TABLE products
ADD FOREIGN KEY (discount_id) REFERENCES discounts(id);

ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE items
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE items
ADD FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE items
ADD FOREIGN KEY (order_id) REFERENCES orders(id);
-- }

-- {**********/ DATA /**********}

-- [TABLA ROLES]
INSERT INTO roles (value, name)
VALUES (5, 'manager'), (10, 'admin'), (15, 'programmer'), (20, 'tester'), (25, 'client');

-- [TABLA CATEGORIAS]
INSERT INTO categories (name)
VALUES ('Casual'), ('Fiesta'), ('Sale');

-- [TABLA TIPOS]
INSERT INTO types (name)
VALUES ('Borcego'), ('Bota'), ('Botineta'), ('Mule'), ('Sandalia'), ('Zapato');

-- [TABLA COLORES]
INSERT INTO colors (name, hex)
VALUES ('Blanco', '#FFFFFF'), ('Marron', '#AF601A'), ('Negro', '#000000'), ('Nude', '#EBC8B2'), ('Oro', '#F8C471' /* #FAD7A0 */), ('Plata', '#BEC2CB'), ('Rojo', '#FF0000');

-- [TABLA IMAGENES]
INSERT INTO images (name)
VALUES 
    ('img_Barbie.jpg'),
    ('img_Barbie2.jpg'),
    ('img_Bella.jpg'),
    ('img_Bella2.jpg'),
    ('img_Bemili.jpg'),
    ('img_Bemili2.jpg'),
    ('img_Berenice.jpg'),
    ('img_Berenice2.jpg'),
    ('img_Bernarda.jpg'),
    ('img_Betania.jpg'),
    ('img_Betania2.jpg'),
    ('img_Bianca.jpg'),
    ('img_Bianca2.jpg'),
    ('img_Briana.jpg'),
    ('img_Briana2.jpg'),
    ('img_Colonia.jpg'),
    ('img_Detroit.jpg'),
    ('img_Faira.jpg'),
    ('img_Faira2.jpg'),
    ('img_Felicitas.jpg'),
    ('img_Fiama.jpg'),
    ('img_Fiama2.jpg'),
    ('img_Fresno.jpg'),
    ('img_Gina.jpg'),
    ('img_Ines.jpg'),
    ('img_Maira.jpg'),
    ('img_Maira2.jpg'),
    ('img_Melisa.jpg'),
    ('img_Melisa2.jpg'),
    ('img_Mivi.jpg'),
    ('img_Mivi2.jpg'),
    ('img_Nantes.jpg'),
    ('img_Pilar.jpg'),
    ('img_Pilar2.jpg'),
    ('img_Texas.jpg'),
    ('img_Tijuana.jpg'),
    ('img_Tini.jpg'),
    ('img_Tini2.jpg');

-- [TABLA MODELOS]
INSERT INTO models (category_id, type_id, name, description, color_id, image_id, base)
VALUES 
    (2, 5, 'Sandalia Barbie', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 3, 1, 1),
    (2, 5, 'Sandalia Barbie', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 4, 2, 0),
    (2, 5, 'Sandalia Bella', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 3, 3, 1),
    (2, 5, 'Sandalia Bella', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 7, 4, 0),
    (2, 5, 'Sandalia Bemili', 'Sandalia de fiesta con plataforma alta. Capellada de Glitter con aplique de flores. Taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 3, 5, 1),
    (2, 5, 'Sandalia Bemili', 'Sandalia de fiesta con plataforma alta. Capellada de Glitter con aplique de flores. Taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 5, 6, 0),
    (2, 5, 'Sandalia Berenice', 'Sandalia de fiesta con plataforma alta. Capellada de cuero y taco forrado en el mismo material con tachas. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 5, 7, 1),
    (2, 5, 'Sandalia Berenice', 'Sandalia de fiesta con plataforma alta. Capellada de cuero y taco forrado en el mismo material con tachas. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 3, 8, 0),
    (2, 5, 'Sandalia Bernarda', 'Sandalia de fiesta con plataforma alta. Capellada de glitter con aplique de piedras, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 7, 9, 1),
    (2, 5, 'Sandalia Betania', 'Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 6, 10, 1),
    (2, 5, 'Sandalia Betania', 'Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 5, 11, 0),
    (2, 5, 'Sandalia Bianca', 'Sandalia de fiesta con plataforma alta. Capellada de raso y taco forrado con sintetico estampado. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 3, 12, 1),
    (2, 5, 'Sandalia Bianca', 'Sandalia de fiesta con plataforma alta. Capellada de raso y taco forrado con sintetico estampado. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 5, 13, 0),
    (2, 5, 'Sandalia Briana', 'Sandalia de fiesta con plataforma alta. Capellada de raso, y taco forrado en glitter. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 5, 14, 1),
    (2, 5, 'Sandalia Briana', 'Sandalia de fiesta con plataforma alta. Capellada de raso, y taco forrado en glitter. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.', 3, 15, 0),
    (3, 3, 'Botineta Colonia', 'Botinetas de cuero combinado, taco aguja. Suela rigida, con tope de goma antideslizante en el taco, altura 9 cm.', 3, 16, 1),
    (3, 3, 'Botineta Detroit', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.', 2, 17, 1),
    (1, 5, 'Sandalia Faira', 'Sandalia de Plataforma de cuero. Base de goma, 4cm de plataforma y 11cm de taco.', 4, 18, 1),
    (1, 5, 'Sandalia Faira', 'Sandalia de Plataforma de cuero. Base de goma, 4cm de plataforma y 11cm de taco.', 2, 19, 0),
    (1, 5, 'Sandalia Felicitas', 'Sandalia de Plataforma, detalle de trenzado en la capellada. Base de goma, 4cm de plataforma y 11cm de taco.', 2, 20, 1),
    (1, 5, 'Sandalia Fiama', 'Sandalia de Plataforma de cuero simil reptil. Base de goma, 4cm de plataforma y 11cm de taco.', 2, 21, 1),
    (1, 5, 'Sandalia Fiama', 'Sandalia de Plataforma de cuero simil reptil. Base de goma, 4cm de plataforma y 11cm de taco.', 4, 22, 0),
    (3, 1, 'Borcego Fresno', 'Borcego de cuero con detalles de tachas, hebilla y cierres laterales. Plataforma de goma de 5cm.', 3, 23, 1),
    (3, 4, 'Mule Gina', 'Mule de cuero marron. Capellada con detalle de rosa bordada y herraje. El interior se encuentra forrado en simil cuero. La suela es de goma antideslizante.', 2, 24, 1),
    (3, 6, 'Zapato Ines', 'Zapato de plataforma de charol y raso. Plataforma de 4 cm y taco de 8 cm.', 3, 25, 1),
    (1, 5, 'Sandalia Maira', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.', 7, 26, 1),
    (1, 5, 'Sandalia Maira', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.', 2, 27, 0),
    (1, 5, 'Sandalia Melisa', 'Sandalia de cuero con detalle de capellada trenzada. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.', 2, 28, 1),
    (1, 5, 'Sandalia Melisa', 'Sandalia de cuero con detalle de capellada trenzada. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.', 4, 29, 0),
    (1, 5, 'Sandalia Mivi', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.', 3, 30, 1),
    (1, 5, 'Sandalia Mivi', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.', 4, 31, 0),
    (3, 2, 'Bota Nantes', 'Bota de cuero con detalle de tachas y cierres laterales. La plataforma y el taco son de goma.', 3, 32, 1),
    (1, 5, 'Sandalia Pilar', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.', 1, 33, 1),
    (1, 5, 'Sandalia Pilar', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.', 2, 34, 0),
    (3, 2, 'Bota Texas', 'Bota texana confeccionada en cuero reptil, con detalle de herrajes y tachas. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.', 1, 35, 1),
    (3, 2, 'Bota Tijuana', 'Bota Texana de cuero, con detalle de flecos. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.', 2, 36, 1),
    (1, 5, 'Sandalia Tini', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.', 4, 37, 1),
    (1, 5, 'Sandalia Tini', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.', 2, 38, 0);

-- [TABLA TALLES]
INSERT INTO sizes (number)
VALUES (35), (36), (37), (38), (39), (40);

-- [TABLA DESCUENTOS]
INSERT INTO discounts (number)
VALUES (0), (10), (15), (20), (25), (30), (40), (50), (60), (70), (75);

-- [TABLA USUARIOS]
INSERT INTO users (role_id, first_name, last_name, email, password, image)
VALUES 
    (2, 'Julieta', 'Retamoza', 'juli@email.com', '$2a$05$7x4o7IpX04bwr.1aSiKNyOzWakhY1sSUtrzvbacOUO5A0CmEST9c2', 'image-1608491509126.png'),
	(2, 'Lucas', 'Koval', 'lucas@email.com', '$2a$05$7/CTO0L3YOSHrN.JaDCxA.KW6H9sHphdOEfZSvWUx7FXF0uXKczSi', 'image-1608491464279.png'),
	(2, 'Federico', 'Gomez', 'fede@email.com', '$2a$05$1rX5hP2rJSFpWJ7JVp8M/uoXGP6Aqmnl3Vv0K8rHSdfdNDmY8h/c.', 'image-1608491558165.png'),
    (2, 'Profe', 'DH', 'profe@email.com', '$2a$05$LsqDf8A0LmjP3mdyf7vRIu/rIqkj8E/74uy8OcakxcIN.bJ2FIX1O', 'image-1608694620529.png'),
	(5, 'Stephen', 'King', 'king@email.com', '$2a$05$doqw8BLnk3z2A.nQ7H9D.e9XBjmNvbR26tYfEVUWgeHu6560Az4fS', 'image-1608491725297.jpg'),
	(5, 'Maria Elena', 'Fuseneco', 'mariaelena@email.com', '$2a$05$DCdZkDjFXScL9P/ip8UD0uY5M5xNFX0BJgwpRDIRFgETMBLNeoMOS', 'image-1608637331149.jpg'),
    (5, 'Cosme', 'Fulanito', 'cosme@email.com', '$2a$05$LOGlgX9hEcSqyvGa1ZFmgOVrEqf00MAePsKA.tvKTO8wpyYZjI4Ce', 'image-1608491620495.jpg'),
	(5, 'Cookie', 'Maliciosa', 'cookie@email.com', '$2a$05$gj.zapK2wpXreuQwFCiCieqsTcVt90ge1.R3.NomwwOprEsYbpoWC', 'image-1608765985166.jpg');

-- [TABLA PRODUCTOS]
INSERT INTO products (model_id, size_id, discount_id, stock, price)
VALUES
/* Barbie */
    (1, 1, 1, 5, 7000),
    (1, 2, 1, 5, 7000),
    (1, 3, 1, 5, 7000),
    (1, 4, 1, 5, 7000),
    (1, 5, 1, 5, 7000),
    (1, 6, 1, 5, 7000),
    (2, 1, 1, 5, 7000),
    (2, 2, 1, 5, 7000),
    (2, 3, 1, 5, 7000),
    (2, 4, 1, 5, 7000),
    (2, 5, 1, 5, 7000),
    (2, 6, 1, 5, 7000),
/* Bella */
    (3, 1, 1, 5, 7000),
    (3, 2, 1, 5, 7000),
    (3, 3, 1, 5, 7000),
    (3, 4, 1, 5, 7000),
    (3, 5, 1, 5, 7000),
    (3, 6, 1, 5, 7000),
    (4, 1, 1, 5, 7000),
    (4, 2, 1, 5, 7000),
    (4, 3, 1, 5, 7000),
    (4, 4, 1, 5, 7000),
    (4, 5, 1, 5, 7000),
    (4, 6, 1, 5, 7000),
/* Bemili */
    (5, 1, 1, 5, 7000),
    (5, 2, 1, 5, 7000),
    (5, 3, 1, 5, 7000),
    (5, 4, 1, 5, 7000),
    (5, 5, 1, 5, 7000),
    (5, 6, 1, 5, 7000),
    (6, 1, 1, 5, 7000),
    (6, 2, 1, 5, 7000),
    (6, 3, 1, 5, 7000),
    (6, 4, 1, 5, 7000),
    (6, 5, 1, 5, 7000),
    (6, 6, 1, 5, 7000),
/* Berenice */
    (7, 1, 1, 5, 7000),
    (7, 2, 1, 5, 7000),
    (7, 3, 1, 5, 7000),
    (7, 4, 1, 5, 7000),
    (7, 5, 1, 5, 7000),
    (7, 6, 1, 5, 7000),
    (8, 1, 1, 5, 7000),
    (8, 2, 1, 5, 7000),
    (8, 3, 1, 5, 7000),
    (8, 4, 1, 5, 7000),
    (8, 5, 1, 5, 7000),
    (8, 6, 1, 5, 7000),
/* Bernarda */
    (9, 1, 1, 5, 7000),
    (9, 2, 1, 5, 7000),
    (9, 3, 1, 5, 7000),
    (9, 4, 1, 5, 7000),
    (9, 5, 1, 5, 7000),
    (9, 6, 1, 5, 7000),
/* Betania */
    (10, 1, 1, 5, 7000),
    (10, 2, 1, 5, 7000),
    (10, 3, 1, 5, 7000),
    (10, 4, 1, 5, 7000),
    (10, 5, 1, 5, 7000),
    (10, 6, 1, 5, 7000),
    (11, 1, 1, 5, 7000),
    (11, 2, 1, 5, 7000),
    (11, 3, 1, 5, 7000),
    (11, 4, 1, 5, 7000),
    (11, 5, 1, 5, 7000),
    (11, 6, 1, 5, 7000),
/* Bianca */
    (12, 1, 1, 5, 7000),
    (12, 2, 1, 5, 7000),
    (12, 3, 1, 5, 7000),
    (12, 4, 1, 5, 7000),
    (12, 5, 1, 5, 7000),
    (12, 6, 1, 5, 7000),
    (13, 1, 1, 5, 7000),
    (13, 2, 1, 5, 7000),
    (13, 3, 1, 5, 7000),
    (13, 4, 1, 5, 7000),
    (13, 5, 1, 5, 7000),
    (13, 6, 1, 5, 7000), 
/* Briana */
    (14, 1, 1, 5, 7000),
    (14, 2, 1, 5, 7000),
    (14, 3, 1, 5, 7000),
    (14, 4, 1, 5, 7000),
    (14, 5, 1, 5, 7000),
    (14, 6, 1, 5, 7000),
    (15, 1, 1, 5, 7000),
    (15, 2, 1, 5, 7000),
    (15, 3, 1, 5, 7000),
    (15, 4, 1, 5, 7000),
    (15, 5, 1, 5, 7000),
    (15, 6, 1, 5, 7000),
/* Colonia */
    (16, 1, 5, 3, 6000),
    (16, 2, 5, 3, 6000),
    (16, 3, 5, 3, 6000),
    (16, 4, 5, 3, 6000),
    (16, 5, 5, 3, 6000),
    (16, 6, 5, 3, 6000),
/* Detroit */
    (17, 1, 4, 3, 6000),
    (17, 2, 4, 3, 6000),
    (17, 3, 4, 3, 6000),
    (17, 4, 4, 3, 6000),
    (17, 5, 4, 3, 6000),
    (17, 6, 4, 3, 6000),
/* Faira */
    (18, 1, 1, 5, 6000),
    (18, 2, 1, 5, 6000),
    (18, 3, 1, 5, 6000),
    (18, 4, 1, 5, 6000),
    (18, 5, 1, 5, 6000),
    (18, 6, 1, 5, 6000),
    (19, 1, 1, 5, 6000),
    (19, 2, 1, 5, 6000),
    (19, 3, 1, 5, 6000),
    (19, 4, 1, 5, 6000),
    (19, 5, 1, 5, 6000),
    (19, 6, 1, 5, 6000),
/* Felicitas */
    (20, 1, 1, 5, 6000),
    (20, 2, 1, 5, 6000),
    (20, 3, 1, 5, 6000),
    (20, 4, 1, 5, 6000),
    (20, 5, 1, 5, 6000),
    (20, 6, 1, 5, 6000),
/* Fiama */
    (21, 1, 1, 5, 6000),
    (21, 2, 1, 5, 6000),
    (21, 3, 1, 5, 6000),
    (21, 4, 1, 5, 6000),
    (21, 5, 1, 5, 6000),
    (21, 6, 1, 5, 6000),
    (22, 1, 1, 5, 6000),
    (22, 2, 1, 5, 6000),
    (22, 3, 1, 5, 6000),
    (22, 4, 1, 5, 6000),
    (22, 5, 1, 5, 6000),
    (22, 6, 1, 5, 6000),
/* Fresno */
    (23, 1, 6, 3, 6000),
    (23, 2, 6, 3, 6000),
    (23, 3, 6, 3, 6000),
    (23, 4, 6, 3, 6000),
    (23, 5, 6, 3, 6000),
    (23, 6, 6, 3, 6000),
/* Gina */
    (24, 1, 5, 3, 6000),
    (24, 2, 5, 3, 6000),
    (24, 3, 5, 3, 6000),
    (24, 4, 5, 3, 6000),
    (24, 5, 5, 3, 6000),
    (24, 6, 5, 3, 6000), 
/* Ines */
    (25, 1, 3, 3, 6000),
    (25, 2, 3, 3, 6000),
    (25, 3, 3, 3, 6000),
    (25, 4, 3, 3, 6000),
    (25, 5, 3, 3, 6000),
    (25, 6, 3, 3, 6000),
/* Maira */
    (26, 1, 1, 5, 6000),
    (26, 2, 1, 5, 6000),
    (26, 3, 1, 5, 6000),
    (26, 4, 1, 5, 6000),
    (26, 5, 1, 5, 6000),
    (26, 6, 1, 5, 6000),
    (27, 1, 1, 5, 6000),
    (27, 2, 1, 5, 6000),
    (27, 3, 1, 5, 6000),
    (27, 4, 1, 5, 6000),
    (27, 5, 1, 5, 6000),
    (27, 6, 1, 5, 6000),
/* Melisa */
    (28, 1, 1, 5, 6000),
    (28, 2, 1, 5, 6000),
    (28, 3, 1, 5, 6000),
    (28, 4, 1, 5, 6000),
    (28, 5, 1, 5, 6000),
    (28, 6, 1, 5, 6000),
    (29, 1, 1, 5, 6000),
    (29, 2, 1, 5, 6000),
    (29, 3, 1, 5, 6000),
    (29, 4, 1, 5, 6000),
    (29, 5, 1, 5, 6000),
    (29, 6, 1, 5, 6000),
/* Mivi */
    (30, 1, 1, 5, 6000),
    (30, 2, 1, 5, 6000),
    (30, 3, 1, 5, 6000),
    (30, 4, 1, 5, 6000),
    (30, 5, 1, 5, 6000),
    (30, 6, 1, 5, 6000),
    (31, 1, 1, 5, 6000),
    (31, 2, 1, 5, 6000),
    (31, 3, 1, 5, 6000),
    (31, 4, 1, 5, 6000),
    (31, 5, 1, 5, 6000),
    (31, 6, 1, 5, 6000),
/* Nantes */
    (32, 1, 3, 3, 6000),
    (32, 2, 3, 3, 6000),
    (32, 3, 3, 3, 6000),
    (32, 4, 3, 3, 6000),
    (32, 5, 3, 3, 6000),
    (32, 6, 3, 3, 6000),
/* Pilar */
    (33, 1, 1, 5, 6000),
    (33, 2, 1, 5, 6000),
    (33, 3, 1, 5, 6000),
    (33, 4, 1, 5, 6000),
    (33, 5, 1, 5, 6000),
    (33, 6, 1, 5, 6000),
    (34, 1, 1, 5, 6000),
    (34, 2, 1, 5, 6000),
    (34, 3, 1, 5, 6000),
    (34, 4, 1, 5, 6000),
    (34, 5, 1, 5, 6000),
    (34, 6, 1, 5, 6000),
/* Texas */
    (35, 1, 7, 3, 6000),
    (35, 2, 7, 3, 6000),
    (35, 3, 7, 3, 6000),
    (35, 4, 7, 3, 6000),
    (35, 5, 7, 3, 6000),
    (35, 6, 7, 3, 6000),
/* Tijuana */
    (36, 1, 5, 3, 6000),
    (36, 2, 5, 3, 6000),
    (36, 3, 5, 3, 6000),
    (36, 4, 5, 3, 6000),
    (36, 5, 5, 3, 6000),
    (36, 6, 5, 3, 6000),
/* Tini */
    (37, 1, 1, 5, 6000),
    (37, 2, 1, 5, 6000),
    (37, 3, 1, 5, 6000),
    (37, 4, 1, 5, 6000),
    (37, 5, 1, 5, 6000),
    (37, 6, 1, 5, 6000),
    (38, 1, 1, 5, 6000),
    (38, 2, 1, 5, 6000),
    (38, 3, 1, 5, 6000),
    (38, 4, 1, 5, 6000),
    (38, 5, 1, 5, 6000),
    (38, 6, 1, 5, 6000);
-- }