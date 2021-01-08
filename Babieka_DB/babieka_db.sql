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

CREATE TABLE models (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME 
);

CREATE TABLE descriptions (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255),
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

CREATE TABLE colors (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
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

CREATE TABLE discounts (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    number INT UNSIGNED DEFAULT 0,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME 
);

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    role_id INT UNSIGNED NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE products (
	id INT(6) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    category_id INT UNSIGNED NOT NULL,
    type_id INT UNSIGNED NOT NULL,
    model_id INT UNSIGNED NOT NULL,
    description_id INT UNSIGNED,
    size_id INT UNSIGNED NOT NULL,
    color_id INT UNSIGNED NOT NULL,
    image_id INT UNSIGNED NOT NULL,
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
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255),
    unit_price INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    subTotal INT UNSIGNED NOT NULL,
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

ALTER TABLE products
ADD FOREIGN KEY (category_id) REFERENCES categories(id);

ALTER TABLE products
ADD FOREIGN KEY (type_id) REFERENCES types(id);

ALTER TABLE products
ADD FOREIGN KEY (model_id) REFERENCES models(id);

ALTER TABLE products
ADD FOREIGN KEY (description_id) REFERENCES descriptions(id);

ALTER TABLE products
ADD FOREIGN KEY (size_id) REFERENCES sizes(id);

ALTER TABLE products
ADD FOREIGN KEY (color_id) REFERENCES colors(id);

ALTER TABLE products
ADD FOREIGN KEY (image_id) REFERENCES images(id);

ALTER TABLE products
ADD FOREIGN KEY (discount_id) REFERENCES discounts(id);

ALTER TABLE items
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE items
ADD FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE items
ADD FOREIGN KEY (order_id) REFERENCES orders(id);

ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id);
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

-- [TABLA MODELOS]
INSERT INTO models (name)
VALUES 
    ('Sandalia Barbie'),
    ('Sandalia Bella'),
    ('Sandalia Bemili'),
    ('Sandalia Berenice'),
    ('Sandalia Bernarda'),
    ('Sandalia Betania'),
    ('Sandalia Bianca'),
    ('Sandalia Briana'),
    ('Botineta Colonia'),
    ('Botineta Detroit'),
    ('Sandalia Faira'),
    ('Sandalia Felicitas'),
    ('Sandalia Fiama'),
    ('Borcego Fresno'),
    ('Mule Gina'),
    ('Zapato Ines'),
    ('Sandalia Maira'),
    ('Sandalia Melisa'),
    ('Sandalia Mivi'),
    ('Bota Nantes'),
    ('Sandalia Pilar'),
    ('Bota Texas'),
    ('Bota Tijuana'),
    ('Sandalia Tini');

-- [TABLA DESCRIPCIONES]
INSERT INTO descriptions (text)
VALUES 
    ('Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rígido sintético, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.'),
    ('Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rígido sintético, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.'),
    ('Sandalia de fiesta con plataforma alta. Capellada de Glitter con aplique de flores. Taco forrado en el mismo material. La suela es de material rígido sintético, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.'),
    ('Sandalia de fiesta con plataforma alta. Capellada de cuero y taco forrado en el mismo material con tachas. La suela es de material rígido sintético, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.'),
    ('Sandalia de fiesta con plataforma alta. Capellada de glitter con aplique de piedras, y taco forrado en el mismo material. La suela es de material rígido sintético, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.'),
    ('Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rígido sintético, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.'),
    ('Sandalia de fiesta con plataforma alta. Capellada de raso y taco forrado con sintético estampado. La suela es de material rígido sintético, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.'),
    ('Sandalia de fiesta con plataforma alta. Capellada de raso, y taco forrado en glitter. La suela es de material rígido sintético, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.'),
    ('Botinetas de cuero combinado, taco aguja. Suela rígida, con tope de goma antideslizante en el taco, altura 9 cm.'),
    ('Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.'),
    ('Sandalia de Plataforma de cuero. Base de goma, 4cm de plataforma y 11cm de taco.'),
    ('Sandalia de Plataforma, detalle de trenzado en la capellada. Base de goma, 4cm de plataforma y 11cm de taco.'),
    ('Sandalia de Plataforma de cuero simil reptil. Base de goma, 4cm de plataforma y 11cm de taco.'),
    ('Borcego de cuero con detalles de tachas, hebilla y cierres laterales. Plataforma de goma de 5cm.'),
    ('Mule de cuero negro. Capellada con detalle de rosa bordada y herraje. El interior se encuentra forrado en símil cuero. La suela es de goma antideslizante.'),
    ('Zapato de plataforma de charol y raso. Plataforma de 4 cm y taco de 8 cm.'),
    ('Sandalia de cuero. Fondo de madera con suelín de goma de 5 cm de plataforma y 11 cm de taco.'),
    ('Sandalia de cuero con detalle de capellada trenzada. Fondo de madera con suelín de goma de 5 cm de plataforma y 11 cm de taco.'),
    ('Sandalia de cuero. Fondo de madera con suelín de goma de 5 cm de plataforma y 11 cm de taco.'),
    ('Bota de cuero con detalle de tachas y cierres laterales. La plataforma y el taco son de goma.'),
    ('Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.'),
    ('Bota texana confeccionada en cuero reptil, con detalle de herrajes y tachas. El interior está forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.'),
    ('Bota Texana de cuero, con detalle de flecos. El interior está forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.'),
    ('Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.');

-- [TABLA TALLES]
INSERT INTO sizes (number)
VALUES (35), (36), (37), (38), (39), (40);

-- [TABLA COLORES]
INSERT INTO colors (name)
VALUES ('Blanco'), ('Marron'), ('Negro'), ('Nude'), ('Oro'), ('Plata'), ('Rojo');

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

-- [TABLA DESCUENTOS]
INSERT INTO discounts (number)
VALUES (0), (10), (15), (20), (25), (30), (40), (50), (60), (70), (75);

-- [TABLA USUARIOS]
INSERT INTO users (role_id, firstName, lastName, email, password, image)
VALUES 
    (2, 'Julieta', 'Retamoza', 'juli@email.com', '$2a$05$7x4o7IpX04bwr.1aSiKNyOzWakhY1sSUtrzvbacOUO5A0CmEST9c2', 'image-1608491509126.png'),
	(2, 'Lucas', 'Koval', 'lucas@email.com', '$2a$05$7/CTO0L3YOSHrN.JaDCxA.KW6H9sHphdOEfZSvWUx7FXF0uXKczSi', 'image-1608491464279.png'),
	(2, 'Federico', 'Gomez', 'fede@email.com', '$2a$05$1rX5hP2rJSFpWJ7JVp8M/uoXGP6Aqmnl3Vv0K8rHSdfdNDmY8h/c.', 'image-1608491558165.png'),
	(5, 'Stephen', 'King', 'king@email.com', '$2a$05$doqw8BLnk3z2A.nQ7H9D.e9XBjmNvbR26tYfEVUWgeHu6560Az4fS', 'image-1608491725297.jpg'),
	(5, 'Cosme', 'Fulanito', 'cosme@email.com', '$2a$05$LOGlgX9hEcSqyvGa1ZFmgOVrEqf00MAePsKA.tvKTO8wpyYZjI4Ce', 'image-1608491620495.jpg'),
	(5, 'Maria Elena', 'Fuseneco', 'mariaelena@email.com', '$2a$05$DCdZkDjFXScL9P/ip8UD0uY5M5xNFX0BJgwpRDIRFgETMBLNeoMOS', 'image-1608637331149.jpg'),
	(5, 'Cookie', 'Maliciosa', 'cookie@email.com', '$2a$05$gj.zapK2wpXreuQwFCiCieqsTcVt90ge1.R3.NomwwOprEsYbpoWC', 'image-1608765985166.jpg'),
	(2, 'Profe', 'DH', 'profe@email.com', '$2a$05$fBshBEv6MIu3tSi3mZ3uL.fzcguUKyb0WbDE2sVOVf2Q55DwyHU1i', 'image-1608694620529.png');

-- [TABLA PRODUCTOS]
INSERT INTO products (category_id, type_id, model_id, description_id, size_id, color_id, image_id, discount_id, stock, price)
VALUES
/* Barbie */
    (2, 5, 1, 1, 1, 3, 1, 1, 7, 7000),
    (2, 5, 1, 1, 2, 3, 1, 1, 7, 7000),
    (2, 5, 1, 1, 3, 3, 1, 1, 7, 7000),
    (2, 5, 1, 1, 4, 3, 1, 1, 7, 7000),
    (2, 5, 1, 1, 5, 3, 1, 1, 7, 7000),
    (2, 5, 1, 1, 6, 3, 1, 1, 7, 7000),
    (2, 5, 1, 1, 1, 4, 2, 1, 7, 7000),
    (2, 5, 1, 1, 2, 4, 2, 1, 7, 7000),
    (2, 5, 1, 1, 3, 4, 2, 1, 7, 7000),
    (2, 5, 1, 1, 4, 4, 2, 1, 7, 7000),
    (2, 5, 1, 1, 5, 4, 2, 1, 7, 7000),
    (2, 5, 1, 1, 6, 4, 2, 1, 7, 7000),
/* Bella */
    (2, 5, 2, 2, 1, 3, 3, 1, 7, 7000),
    (2, 5, 2, 2, 2, 3, 3, 1, 7, 7000),
    (2, 5, 2, 2, 3, 3, 3, 1, 7, 7000),
    (2, 5, 2, 2, 4, 3, 3, 1, 7, 7000),
    (2, 5, 2, 2, 5, 3, 3, 1, 7, 7000),
    (2, 5, 2, 2, 6, 3, 3, 1, 7, 7000),
    (2, 5, 2, 2, 1, 7, 4, 1, 7, 7000),
    (2, 5, 2, 2, 2, 7, 4, 1, 7, 7000),
    (2, 5, 2, 2, 3, 7, 4, 1, 7, 7000),
    (2, 5, 2, 2, 4, 7, 4, 1, 7, 7000),
    (2, 5, 2, 2, 5, 7, 4, 1, 7, 7000),
    (2, 5, 2, 2, 6, 7, 4, 1, 7, 7000),
/* Bemili */
    (2, 5, 3, 3, 1, 3, 5, 1, 7, 7000),
    (2, 5, 3, 3, 2, 3, 5, 1, 7, 7000),
    (2, 5, 3, 3, 3, 3, 5, 1, 7, 7000),
    (2, 5, 3, 3, 4, 3, 5, 1, 7, 7000),
    (2, 5, 3, 3, 5, 3, 5, 1, 7, 7000),
    (2, 5, 3, 3, 6, 3, 5, 1, 7, 7000),
    (2, 5, 3, 3, 1, 5, 6, 1, 7, 7000),
    (2, 5, 3, 3, 2, 5, 6, 1, 7, 7000),
    (2, 5, 3, 3, 3, 5, 6, 1, 7, 7000),
    (2, 5, 3, 3, 4, 5, 6, 1, 7, 7000),
    (2, 5, 3, 3, 5, 5, 6, 1, 7, 7000),
    (2, 5, 3, 3, 6, 5, 6, 1, 7, 7000),
/* Berenice */
    (2, 5, 4, 4, 1, 5, 7, 1, 7, 7000),
    (2, 5, 4, 4, 2, 5, 7, 1, 7, 7000),
    (2, 5, 4, 4, 3, 5, 7, 1, 7, 7000),
    (2, 5, 4, 4, 4, 5, 7, 1, 7, 7000),
    (2, 5, 4, 4, 5, 5, 7, 1, 7, 7000),
    (2, 5, 4, 4, 6, 5, 7, 1, 7, 7000),
    (2, 5, 4, 4, 1, 3, 8, 1, 7, 7000),
    (2, 5, 4, 4, 2, 3, 8, 1, 7, 7000),
    (2, 5, 4, 4, 3, 3, 8, 1, 7, 7000),
    (2, 5, 4, 4, 4, 3, 8, 1, 7, 7000),
    (2, 5, 4, 4, 5, 3, 8, 1, 7, 7000),
    (2, 5, 4, 4, 6, 3, 8, 1, 7, 7000),
/* Bernarda */
    (2, 5, 5, 5, 1, 7, 9, 1, 7, 7000),
    (2, 5, 5, 5, 2, 7, 9, 1, 7, 7000),
    (2, 5, 5, 5, 3, 7, 9, 1, 7, 7000),
    (2, 5, 5, 5, 4, 7, 9, 1, 7, 7000),
    (2, 5, 5, 5, 5, 7, 9, 1, 7, 7000),
    (2, 5, 5, 5, 6, 7, 9, 1, 7, 7000),
/* Betania */
    (2, 5, 6, 6, 1, 6, 10, 1, 7, 7000),
    (2, 5, 6, 6, 2, 6, 10, 1, 7, 7000),
    (2, 5, 6, 6, 3, 6, 10, 1, 7, 7000),
    (2, 5, 6, 6, 4, 6, 10, 1, 7, 7000),
    (2, 5, 6, 6, 5, 6, 10, 1, 7, 7000),
    (2, 5, 6, 6, 6, 6, 10, 1, 7, 7000),
    (2, 5, 6, 6, 1, 5, 11, 1, 7, 7000),
    (2, 5, 6, 6, 2, 5, 11, 1, 7, 7000),
    (2, 5, 6, 6, 3, 5, 11, 1, 7, 7000),
    (2, 5, 6, 6, 4, 5, 11, 1, 7, 7000),
    (2, 5, 6, 6, 5, 5, 11, 1, 7, 7000),
    (2, 5, 6, 6, 6, 5, 11, 1, 7, 7000),
/* Bianca */
    (2, 5, 7, 7, 1, 3, 12, 1, 7, 7000),
    (2, 5, 7, 7, 2, 3, 12, 1, 7, 7000),
    (2, 5, 7, 7, 3, 3, 12, 1, 7, 7000),
    (2, 5, 7, 7, 4, 3, 12, 1, 7, 7000),
    (2, 5, 7, 7, 5, 3, 12, 1, 7, 7000),
    (2, 5, 7, 7, 6, 3, 12, 1, 7, 7000),
    (2, 5, 7, 7, 1, 5, 13, 1, 7, 7000),
    (2, 5, 7, 7, 2, 5, 13, 1, 7, 7000),
    (2, 5, 7, 7, 3, 5, 13, 1, 7, 7000),
    (2, 5, 7, 7, 4, 5, 13, 1, 7, 7000),
    (2, 5, 7, 7, 5, 5, 13, 1, 7, 7000),
    (2, 5, 7, 7, 6, 5, 13, 1, 7, 7000), 
/* Briana */
    (2, 5, 8, 8, 1, 5, 14, 1, 7, 7000),
    (2, 5, 8, 8, 2, 5, 14, 1, 7, 7000),
    (2, 5, 8, 8, 3, 5, 14, 1, 7, 7000),
    (2, 5, 8, 8, 4, 5, 14, 1, 7, 7000),
    (2, 5, 8, 8, 5, 5, 14, 1, 7, 7000),
    (2, 5, 8, 8, 6, 5, 14, 1, 7, 7000),
    (2, 5, 8, 8, 1, 3, 15, 1, 7, 7000),
    (2, 5, 8, 8, 2, 3, 15, 1, 7, 7000),
    (2, 5, 8, 8, 3, 3, 15, 1, 7, 7000),
    (2, 5, 8, 8, 4, 3, 15, 1, 7, 7000),
    (2, 5, 8, 8, 5, 3, 15, 1, 7, 7000),
    (2, 5, 8, 8, 6, 3, 15, 1, 7, 7000),
/* Colonia */
    (3, 3, 9, 9, 1, 3, 16, 5, 7, 7000),
    (3, 3, 9, 9, 2, 3, 16, 5, 7, 7000),
    (3, 3, 9, 9, 3, 3, 16, 5, 7, 7000),
    (3, 3, 9, 9, 4, 3, 16, 5, 7, 7000),
    (3, 3, 9, 9, 5, 3, 16, 5, 7, 7000),
    (3, 3, 9, 9, 6, 3, 16, 5, 7, 7000),
/* Detroit */
    (3, 3, 10, 10, 1, 2, 17, 5, 7, 7000),
    (3, 3, 10, 10, 2, 2, 17, 5, 7, 7000),
    (3, 3, 10, 10, 3, 2, 17, 5, 7, 7000),
    (3, 3, 10, 10, 4, 2, 17, 5, 7, 7000),
    (3, 3, 10, 10, 5, 2, 17, 5, 7, 7000),
    (3, 3, 10, 10, 6, 2, 17, 5, 7, 7000),
/* Faira */
    (1, 5, 11, 11, 1, 4, 18, 1, 7, 6000),
    (1, 5, 11, 11, 2, 4, 18, 1, 7, 6000),
    (1, 5, 11, 11, 3, 4, 18, 1, 7, 6000),
    (1, 5, 11, 11, 4, 4, 18, 1, 7, 6000),
    (1, 5, 11, 11, 5, 4, 18, 1, 7, 6000),
    (1, 5, 11, 11, 6, 4, 18, 1, 7, 6000),
    (1, 5, 11, 11, 1, 2, 19, 1, 7, 6000),
    (1, 5, 11, 11, 2, 2, 19, 1, 7, 6000),
    (1, 5, 11, 11, 3, 2, 19, 1, 7, 6000),
    (1, 5, 11, 11, 4, 2, 19, 1, 7, 6000),
    (1, 5, 11, 11, 5, 2, 19, 1, 7, 6000),
    (1, 5, 11, 11, 6, 2, 19, 1, 7, 6000),
/* Felicitas */
    (1, 5, 12, 12, 1, 2, 20, 1, 7, 6000),
    (1, 5, 12, 12, 2, 2, 20, 1, 7, 6000),
    (1, 5, 12, 12, 3, 2, 20, 1, 7, 6000),
    (1, 5, 12, 12, 4, 2, 20, 1, 7, 6000),
    (1, 5, 12, 12, 5, 2, 20, 1, 7, 6000),
    (1, 5, 12, 12, 6, 2, 20, 1, 7, 6000),
/* Fiama */
    (1, 5, 13, 13, 1, 2, 21, 1, 7, 6000),
    (1, 5, 13, 13, 2, 2, 21, 1, 7, 6000),
    (1, 5, 13, 13, 3, 2, 21, 1, 7, 6000),
    (1, 5, 13, 13, 4, 2, 21, 1, 7, 6000),
    (1, 5, 13, 13, 5, 2, 21, 1, 7, 6000),
    (1, 5, 13, 13, 6, 2, 21, 1, 7, 6000),
    (1, 5, 13, 13, 1, 4, 22, 1, 7, 6000),
    (1, 5, 13, 13, 2, 4, 22, 1, 7, 6000),
    (1, 5, 13, 13, 3, 4, 22, 1, 7, 6000),
    (1, 5, 13, 13, 4, 4, 22, 1, 7, 6000),
    (1, 5, 13, 13, 5, 4, 22, 1, 7, 6000),
    (1, 5, 13, 13, 6, 4, 22, 1, 7, 6000),
/* Fresno */
    (3, 1, 14, 14, 1, 3, 23, 5, 7, 7000),
    (3, 1, 14, 14, 2, 3, 23, 5, 7, 7000),
    (3, 1, 14, 14, 3, 3, 23, 5, 7, 7000),
    (3, 1, 14, 14, 4, 3, 23, 5, 7, 7000),
    (3, 1, 14, 14, 5, 3, 23, 5, 7, 7000),
    (3, 1, 14, 14, 6, 3, 23, 5, 7, 7000),
/* Gina */
    (3, 4, 15, 15, 1, 3, 24, 5, 7, 7000),
    (3, 4, 15, 15, 2, 3, 24, 5, 7, 7000),
    (3, 4, 15, 15, 3, 3, 24, 5, 7, 7000),
    (3, 4, 15, 15, 4, 3, 24, 5, 7, 7000),
    (3, 4, 15, 15, 5, 3, 24, 5, 7, 7000),
    (3, 4, 15, 15, 6, 3, 24, 5, 7, 7000),  
/* Ines */
    (3, 6, 16, 16, 1, 3, 25, 5, 7, 7000),
    (3, 6, 16, 16, 2, 3, 25, 5, 7, 7000),
    (3, 6, 16, 16, 3, 3, 25, 5, 7, 7000),
    (3, 6, 16, 16, 4, 3, 25, 5, 7, 7000),
    (3, 6, 16, 16, 5, 3, 25, 5, 7, 7000),
    (3, 6, 16, 16, 6, 3, 25, 5, 7, 7000),  
/* Maira */
    (1, 5, 17, 17, 1, 7, 26, 1, 7, 6000),
    (1, 5, 17, 17, 2, 7, 26, 1, 7, 6000),
    (1, 5, 17, 17, 3, 7, 26, 1, 7, 6000),
    (1, 5, 17, 17, 4, 7, 26, 1, 7, 6000),
    (1, 5, 17, 17, 5, 7, 26, 1, 7, 6000),
    (1, 5, 17, 17, 6, 7, 26, 1, 7, 6000),
    (1, 5, 17, 17, 1, 2, 27, 1, 7, 6000),
    (1, 5, 17, 17, 2, 2, 27, 1, 7, 6000),
    (1, 5, 17, 17, 3, 2, 27, 1, 7, 6000),
    (1, 5, 17, 17, 4, 2, 27, 1, 7, 6000),
    (1, 5, 17, 17, 5, 2, 27, 1, 7, 6000),
    (1, 5, 17, 17, 6, 2, 27, 1, 7, 6000),
/* Melisa */
    (1, 5, 18, 18, 1, 2, 28, 1, 7, 6000),
    (1, 5, 18, 18, 2, 2, 28, 1, 7, 6000),
    (1, 5, 18, 18, 3, 2, 28, 1, 7, 6000),
    (1, 5, 18, 18, 4, 2, 28, 1, 7, 6000),
    (1, 5, 18, 18, 5, 2, 28, 1, 7, 6000),
    (1, 5, 18, 18, 6, 2, 28, 1, 7, 6000),
    (1, 5, 18, 18, 1, 4, 29, 1, 7, 6000),
    (1, 5, 18, 18, 2, 4, 29, 1, 7, 6000),
    (1, 5, 18, 18, 3, 4, 29, 1, 7, 6000),
    (1, 5, 18, 18, 4, 4, 29, 1, 7, 6000),
    (1, 5, 18, 18, 5, 4, 29, 1, 7, 6000),
    (1, 5, 18, 18, 6, 4, 29, 1, 7, 6000),
/* Mivi */
    (1, 5, 19, 19, 1, 3, 30, 1, 7, 6000),
    (1, 5, 19, 19, 2, 3, 30, 1, 7, 6000),
    (1, 5, 19, 19, 3, 3, 30, 1, 7, 6000),
    (1, 5, 19, 19, 4, 3, 30, 1, 7, 6000),
    (1, 5, 19, 19, 5, 3, 30, 1, 7, 6000),
    (1, 5, 19, 19, 6, 3, 30, 1, 7, 6000),
    (1, 5, 19, 19, 1, 4, 31, 1, 7, 6000),
    (1, 5, 19, 19, 2, 4, 31, 1, 7, 6000),
    (1, 5, 19, 19, 3, 4, 31, 1, 7, 6000),
    (1, 5, 19, 19, 4, 4, 31, 1, 7, 6000),
    (1, 5, 19, 19, 5, 4, 31, 1, 7, 6000),
    (1, 5, 19, 19, 6, 4, 31, 1, 7, 6000),
/* Nantes */
    (3, 2, 20, 20, 1, 3, 32, 5, 7, 7000),
    (3, 2, 20, 20, 2, 3, 32, 5, 7, 7000),
    (3, 2, 20, 20, 3, 3, 32, 5, 7, 7000),
    (3, 2, 20, 20, 4, 3, 32, 5, 7, 7000),
    (3, 2, 20, 20, 5, 3, 32, 5, 7, 7000),
    (3, 2, 20, 20, 6, 3, 32, 5, 7, 7000),
/* Pilar */
    (1, 5, 21, 21, 1, 1, 33, 1, 7, 6000),
    (1, 5, 21, 21, 2, 1, 33, 1, 7, 6000),
    (1, 5, 21, 21, 3, 1, 33, 1, 7, 6000),
    (1, 5, 21, 21, 4, 1, 33, 1, 7, 6000),
    (1, 5, 21, 21, 5, 1, 33, 1, 7, 6000),
    (1, 5, 21, 21, 6, 1, 33, 1, 7, 6000),
    (1, 5, 21, 21, 1, 2, 34, 1, 7, 6000),
    (1, 5, 21, 21, 2, 2, 34, 1, 7, 6000),
    (1, 5, 21, 21, 3, 2, 34, 1, 7, 6000),
    (1, 5, 21, 21, 4, 2, 34, 1, 7, 6000),
    (1, 5, 21, 21, 5, 2, 34, 1, 7, 6000),
    (1, 5, 21, 21, 6, 2, 34, 1, 7, 6000),
/* Texas */
    (3, 2, 22, 22, 1, 1, 35, 5, 7, 7000),
    (3, 2, 22, 22, 2, 1, 35, 5, 7, 7000),
    (3, 2, 22, 22, 3, 1, 35, 5, 7, 7000),
    (3, 2, 22, 22, 4, 1, 35, 5, 7, 7000),
    (3, 2, 22, 22, 5, 1, 35, 5, 7, 7000),
    (3, 2, 22, 22, 6, 1, 35, 5, 7, 7000),
/* Tijuana */
    (3, 2, 23, 23, 1, 2, 36, 5, 7, 7000),
    (3, 2, 23, 23, 2, 2, 36, 5, 7, 7000),
    (3, 2, 23, 23, 3, 2, 36, 5, 7, 7000),
    (3, 2, 23, 23, 4, 2, 36, 5, 7, 7000),
    (3, 2, 23, 23, 5, 2, 36, 5, 7, 7000),
    (3, 2, 23, 23, 6, 2, 36, 5, 7, 7000),
/* Tini */
    (1, 5, 24, 24, 1, 4, 37, 1, 7, 6000),
    (1, 5, 24, 24, 2, 4, 37, 1, 7, 6000),
    (1, 5, 24, 24, 3, 4, 37, 1, 7, 6000),
    (1, 5, 24, 24, 4, 4, 37, 1, 7, 6000),
    (1, 5, 24, 24, 5, 4, 37, 1, 7, 6000),
    (1, 5, 24, 24, 6, 4, 37, 1, 7, 6000),
    (1, 5, 24, 24, 1, 2, 38, 1, 7, 6000),
    (1, 5, 24, 24, 2, 2, 38, 1, 7, 6000),
    (1, 5, 24, 24, 3, 2, 38, 1, 7, 6000),
    (1, 5, 24, 24, 4, 2, 38, 1, 7, 6000),
    (1, 5, 24, 24, 5, 2, 38, 1, 7, 6000),
    (1, 5, 24, 24, 6, 2, 38, 1, 7, 6000); 
-- }