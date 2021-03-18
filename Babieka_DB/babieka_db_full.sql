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
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    size DECIMAL UNSIGNED NOT NULL,
    category VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255),
    price INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    subtotal INT UNSIGNED NOT NULL,
    status INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    order_id INT UNSIGNED,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE orders (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
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
ADD FOREIGN KEY (order_id) REFERENCES orders(id);
-- }

-- {**********/ DATA /**********}

-- [TABLA ROLES]
INSERT INTO roles (value, name)
VALUES
    (5, 'manager'),
    (10, 'admin'),
    (15, 'developer'),
    (20, 'tester'),
    (25, 'client');

-- [TABLA CATEGORIAS]
INSERT INTO categories (name)
VALUES
    ('Casual'),
    ('Fiesta'),
    ('Sale');

-- [TABLA TIPOS]
INSERT INTO types (name)
VALUES
    ('Borcego'),
    ('Bota'),
    ('Botineta'),
    ('Mule'),
    ('Sandalia'),
    ('Zapato');

-- [TABLA COLORES]
INSERT INTO colors (name, hex)
VALUES
    ('Blanco', '#FFFFFF'),
    ('Marron', '#AF601A'),
    ('Negro', '#000000'),
    ('Nude', '#EBC8B2'),
    ('Oro', '#F8C471'),
    ('Plata', '#BEC2CB'),
    ('Rojo', '#FF0000');

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
    (1, 'Elon', 'Musk', 'elon@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_elon.jpg'),
    (2, 'Julieta', 'Retamoza', 'juli@email.com', '$2a$05$7x4o7IpX04bwr.1aSiKNyOzWakhY1sSUtrzvbacOUO5A0CmEST9c2', 'img_user_admin.png'),
	(2, 'Lucas', 'Koval', 'lucas@email.com', '$2a$05$8plHp1PWbVEjTU5Ax5biHedvSd.rtuJ114.9vfHr0/3DOnTObECsu', 'img_user_admin.png'),
	(2, 'Federico', 'Gomez', 'fede@email.com', '$2a$05$1rX5hP2rJSFpWJ7JVp8M/uoXGP6Aqmnl3Vv0K8rHSdfdNDmY8h/c.', 'img_user_admin.png'),
    (3, 'Sammie', 'Lee', 'sammie@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_it.jpg'),
    (3, 'Lautaro', 'Barandiaran', 'lauti@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_it.jpg'),
	(3, 'Juan', 'Pravata', 'juan@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_it.jpg'),
    (3, 'Agustin', 'Gaggero', 'manuelito@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_it.jpg'),
    (4, 'Gonzalo', 'Zevallos', 'gonza@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_it.jpg'),
    (4, 'Joaquin', 'Di Toma', 'pola@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_it.jpg'),
    (4, 'Pablo', 'Bacchetta', 'pol@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_it.jpg'),
    (5, 'Stephen', 'King', 'king@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_king.jpg'),
    (5, 'Marta', 'Sanchez', 'marti@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Laura', 'Pascal', 'lau@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Carlos', 'Gonzales', 'carlox@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Ramon', 'Sevilla', 'rambo@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Mario', 'Luna', 'marianito@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Gabriela', 'Sastre', 'gabi@email.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Callie', 'Cortnay', 'ccortnay0@msn.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Robbyn', 'Linham', 'rlinham1@craigslist.org', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Robbi', 'Rookes', 'rrookes2@jugem.jp', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Oralia', 'Corser', 'ocorser3@vinaora.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Delilah', 'Dillamore', 'ddillamore4@blinklist.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Laurene', 'Muggleston', 'lmuggleston5@mlb.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Blanca', 'Gogay', 'bgogay6@bloglines.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Tatiania', 'Goldsack', 'tgoldsack7@boston.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Dominga', 'Healks', 'dhealks8@go.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Micky', 'Vidyapin', 'mvidyapin9@reverbnation.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Leland', 'Bullion', 'lbulliona@umich.edu', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Kirstin', 'Brazelton', 'kbrazeltonb@wp.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Randy', 'Chinery', 'rchineryc@devhub.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Umeko', 'Joinson', 'ujoinsond@mashable.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Isabel', 'Pethick', 'ipethicke@imdb.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Cecile', 'Musico', 'cmusicof@yelp.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Roana', 'Skupinski', 'rskupinskig@hao123.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Alia', 'Lamming', 'alammingh@angelfire.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Ana', 'Rase', 'arasei@seattletimes.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Eirena', 'Doding', 'edodingj@ft.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Melloney', 'Wickett', 'mwickettk@howstuffworks.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Kassey', 'Quinet', 'kquinetl@cnet.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Shir', 'Ladlow', 'sladlowm@hatena.ne.jp', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Gwenore', 'East', 'geastn@nature.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Nancee', 'Brolly', 'nbrollyo@economist.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Jasmina', 'Arnowitz', 'jarnowitzp@usgs.gov', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Merissa', 'Ortega', 'mortegaq@google.es', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Suzie', 'Willshere', 'swillsherer@furl.net', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Edie', 'Moat', 'emoats@ehow.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Joana', 'Lamprey', 'jlampreyt@flickr.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Cecelia', 'Kamien', 'ckamienu@gizmodo.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Maryellen', 'Ramble', 'mramblev@odnoklassniki.ru', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Winne', 'Everingham', 'weveringhamw@mediafire.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Marquita', 'Tomasini', 'mtomasinix@example.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Matty', 'Gomer', 'mgomery@google.ca', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Karlotte', 'Clinton', 'kclintonz@cpanel.net', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Rozina', 'Telford', 'rtelford10@toplist.cz', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Hailee', 'Shasnan', 'hshasnan11@latimes.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Robinette', 'Pudner', 'rpudner12@meetup.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Kaitlyn', 'Lyston', 'klyston13@moonfruit.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Sharon', 'Dosedale', 'sdosedale14@wired.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Reena', 'De Ferrari', 'rdeferrari15@prweb.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Florrie', 'Wearing', 'fwearing16@netscape.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Darcee', 'Birrell', 'dbirrell17@virginia.edu', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png'),
    (5, 'Sara', 'Kalov', 'fcoates18@scientificamerican.com', '$2a$05$XXnakNYGdDejgoSGqleQy.RczPO9mNh2deqbcN5j8mZhSThoThsze', 'img_user_client.png');
    
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

-- [TABLA ORDENES DE COMPRA]
INSERT INTO orders 
VALUES
    (1, 12, 39000, '2021-03-05 02:35:15','2021-03-05 02:35:15',NULL),
    (2, 13, 9000, '2021-03-05 02:35:57','2021-03-05 02:35:57',NULL),
    (3, 14, 7000, '2021-03-05 02:36:35','2021-03-05 02:36:35',NULL),
    (4, 14, 7000, '2021-03-05 02:37:09','2021-03-05 02:37:09',NULL),
    (5, 15, 12000, '2021-03-05 02:37:31','2021-03-05 02:37:31',NULL),
    (6, 16, 4500, '2021-03-05 02:37:45','2021-03-05 02:37:45',NULL),
    (7, 17, 3600, '2021-03-05 02:38:03','2021-03-05 02:38:03',NULL),
    (8, 18, 13000, '2021-03-05 02:38:56','2021-03-05 02:38:56',NULL),
    (9, 19, 17500, '2021-03-05 02:39:24','2021-03-05 02:39:24',NULL),
    (10, 20, 11800, '2021-03-05 02:39:50','2021-03-05 02:39:50',NULL),
    (11, 21, 17200, '2021-03-05 02:40:21','2021-03-05 02:40:21',NULL),
    (12, 22, 17500, '2021-03-05 02:41:05','2021-03-05 02:41:05',NULL),
    (13, 23, 18100, '2021-03-05 02:41:43','2021-03-05 02:41:43',NULL),
    (14, 24, 18100, '2021-03-05 02:42:08','2021-03-05 02:42:08',NULL),
    (15, 25, 16600, '2021-03-05 02:42:49','2021-03-05 02:42:49',NULL),
    (16, 26, 17500, '2021-03-05 02:43:17','2021-03-05 02:43:17',NULL),
    (17, 27, 6000, '2021-03-05 02:43:37','2021-03-05 02:43:37',NULL),
    (18, 28, 9000, '2021-03-05 02:44:02','2021-03-05 02:44:02',NULL),
    (19, 29, 9600, '2021-03-05 02:44:32','2021-03-05 02:44:32',NULL),
    (20, 30, 16600, '2021-03-05 02:45:02','2021-03-05 02:45:02',NULL),
    (21, 31, 6000, '2021-03-05 02:45:30','2021-03-05 02:45:30',NULL),
    (22, 32, 4200, '2021-03-05 02:45:45','2021-03-05 02:45:45',NULL),
    (23, 33, 11500, '2021-03-05 02:46:06','2021-03-05 02:46:06',NULL),
    (24, 34, 10800, '2021-03-05 02:46:26','2021-03-05 02:46:26',NULL),
    (25, 35, 7000, '2021-03-05 02:46:44','2021-03-05 02:46:44',NULL),
    (26, 36, 12000, '2021-03-05 02:47:06','2021-03-05 02:47:06',NULL),
    (27, 37, 11800, '2021-03-05 02:47:32','2021-03-05 02:47:32',NULL),
    (28, 38, 4800, '2021-03-05 02:47:46','2021-03-05 02:47:46',NULL),
    (29, 39, 4500, '2021-03-05 02:48:06','2021-03-05 02:48:06',NULL),
    (30, 40, 6000, '2021-03-05 02:48:24','2021-03-05 02:48:24',NULL),
    (31, 41, 6000, '2021-03-05 02:48:42','2021-03-05 02:48:42',NULL),
    (32, 42, 7000, '2021-03-05 02:48:57','2021-03-05 02:48:57',NULL),
    (33, 43, 7000, '2021-03-05 02:49:14','2021-03-05 02:49:14',NULL),
    (34, 44, 4800, '2021-03-05 02:52:45','2021-03-05 02:52:45',NULL),
    (35, 45, 4500, '2021-03-05 02:53:00','2021-03-05 02:53:00',NULL),
    (36, 46, 7000, '2021-03-05 02:53:12','2021-03-05 02:53:12',NULL),
    (37, 46, 7000, '2021-03-05 02:55:07','2021-03-05 02:55:07',NULL),
    (38, 47, 6000, '2021-03-05 02:55:27','2021-03-05 02:55:27',NULL),
    (39, 47, 6000, '2021-03-05 02:55:37','2021-03-05 02:55:37',NULL),
    (40, 49, 6000, '2021-03-05 02:55:57','2021-03-05 02:55:57',NULL),
    (41, 50, 6000, '2021-03-05 02:56:21','2021-03-05 02:56:21',NULL),
    (42, 51, 11100, '2021-03-05 02:56:44','2021-03-05 02:56:44',NULL),
    (43, 52, 11500, '2021-03-05 02:57:11','2021-03-05 02:57:11',NULL),
    (44, 53, 7000, '2021-03-05 02:57:30','2021-03-05 02:57:30',NULL),
    (45, 54, 4500, '2021-03-05 02:57:49','2021-03-05 02:57:49',NULL),
    (46, 55, 6000, '2021-03-05 02:58:08','2021-03-05 02:58:08',NULL),
    (47, 56, 3600, '2021-03-05 02:58:27','2021-03-05 02:58:27',NULL),
    (48, 57, 10500, '2021-03-05 02:58:55','2021-03-05 02:58:55',NULL),
    (49, 58, 7000, '2021-03-05 02:59:26','2021-03-05 02:59:26',NULL),
    (50, 59, 9300, '2021-03-05 02:59:50','2021-03-05 02:59:50',NULL),
    (51, 60, 13000, '2021-03-05 03:00:10','2021-03-05 03:00:10',NULL),
    (52, 61, 17500, '2021-03-05 03:00:43','2021-03-05 03:00:43',NULL),
    (53, 62, 7000, '2021-03-05 03:00:57','2021-03-05 03:00:57',NULL),
    (54, 63, 7000, '2021-03-05 03:01:20','2021-03-05 03:01:20',NULL),
    (55, 57, 7000, '2021-03-05 03:01:41','2021-03-05 03:01:41',NULL),
    (56, 52, 3600, '2021-03-05 03:02:07','2021-03-05 03:02:07',NULL),
    (57, 45, 6000, '2021-03-05 03:02:21','2021-03-05 03:02:21',NULL),
    (58, 41, 5100, '2021-03-05 03:02:37','2021-03-05 03:02:37',NULL),
    (59, 33, 13000, '2021-03-05 03:03:03','2021-03-05 03:03:03',NULL),
    (60, 29, 4800, '2021-03-05 03:03:24','2021-03-05 03:03:24',NULL),
    (61, 23, 4800, '2021-03-05 03:03:41','2021-03-05 03:03:41',NULL),
    (62, 20, 11500, '2021-03-05 03:04:02','2021-03-05 03:04:02',NULL),
    (63, 18, 7000, '2021-03-05 03:05:25','2021-03-05 03:05:25',NULL),
    (64, 12, 17200, '2021-03-05 03:12:02','2021-03-05 03:12:02',NULL),
    (65, 33, 5100, '2021-03-05 03:12:32','2021-03-05 03:12:32',NULL),
    (66, 23, 13000, '2021-03-05 03:13:14','2021-03-05 03:13:14',NULL);

-- [TABLA ITEMS COMPRADOS]
INSERT INTO items 
VALUES
    (1, 'Sandalia Barbie', 'Negro', 35, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Barbie.jpg', 7000, 1, 7000, 1, 12, 1, '2021-03-05 02:33:13','2021-03-05 02:35:15',NULL),
    (2, 'Sandalia Faira', 'Nude', 35, 'Casual', 'Sandalia de Plataforma de cuero. Base de goma, 4cm de plataforma y 11cm de taco.','img_Faira.jpg', 6000, 1, 6000, 1, 12, 1, '2021-03-05 02:33:52','2021-03-05 02:35:15',NULL),
    (3, 'Sandalia Briana', 'Negro', 35, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de raso, y taco forrado en glitter. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Briana.jpg', 7000, 1, 7000, 1, 12, 1, '2021-03-05 02:34:06','2021-03-05 02:35:15',NULL),
    (4, 'Sandalia Bianca', 'Oro', 35, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de raso y taco forrado con sintetico estampado. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bianca.jpg', 7000, 1, 7000, 1, 12, 1, '2021-03-05 02:34:17','2021-03-05 02:35:15',NULL),
    (5, 'Sandalia Maira', 'Rojo', 35, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Maira.jpg', 6000, 1, 6000, 1, 12, 1, '2021-03-05 02:34:39','2021-03-05 02:35:15',NULL),
    (6, 'Sandalia Pilar', 'Blanco', 35, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Pilar.jpg', 6000, 1, 6000, 1, 12, 1, '2021-03-05 02:34:55','2021-03-05 02:35:15',NULL),
    (7, 'Botineta Colonia', 'Negro', 35, 'Sale', 'Botinetas de cuero combinado, taco aguja. Suela rigida, con tope de goma antideslizante en el taco, altura 9 cm.','img_Colonia.jpg', 6000, 1, 4500, 1, 13, 2, '2021-03-05 02:35:49','2021-03-05 02:35:57',NULL),
    (8, 'Bota Tijuana', 'Marron', 35, 'Sale', 'Bota Texana de cuero, con detalle de flecos. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Tijuana.jpg', 6000, 1, 4500, 1, 13, 2, '2021-03-05 02:35:55','2021-03-05 02:35:57',NULL),
    (9, 'Sandalia Betania', 'Plata', 35, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Betania.jpg', 7000, 1, 7000, 1, 14, 3, '2021-03-05 02:36:34','2021-03-05 02:36:35',NULL),
    (10, 'Sandalia Betania', 'Oro', 35, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Betania.jpg', 7000, 1, 7000, 1, 14, 4, '2021-03-05 02:37:08','2021-03-05 02:37:09',NULL),
    (11, 'Sandalia Faira', 'Nude', 36, 'Casual', 'Sandalia de Plataforma de cuero. Base de goma, 4cm de plataforma y 11cm de taco.','img_Faira.jpg', 6000, 1, 6000, 1, 15, 5, '2021-03-05 02:37:22','2021-03-05 02:37:31',NULL),
    (12, 'Sandalia Tini', 'Nude', 36, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Tini.jpg', 6000, 1, 6000, 1, 15, 5, '2021-03-05 02:37:29','2021-03-05 02:37:31',NULL),
    (13, 'Bota Tijuana', 'Marron', 36, 'Sale', 'Bota Texana de cuero, con detalle de flecos. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Tijuana.jpg', 6000, 1, 4500, 1, 16, 6, '2021-03-05 02:37:43','2021-03-05 02:37:45',NULL),
    (14, 'Bota Texas', 'Blanco', 36, 'Sale', 'Bota texana confeccionada en cuero reptil, con detalle de herrajes y tachas. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Texas.jpg', 6000, 1, 3600, 1, 17, 7, '2021-03-05 02:38:01','2021-03-05 02:38:03',NULL),
    (15, 'Sandalia Bianca', 'Oro', 36, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de raso y taco forrado con sintetico estampado. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bianca.jpg', 7000, 1, 7000, 1, 18, 8, '2021-03-05 02:38:29','2021-03-05 02:38:56',NULL),
    (16, 'Sandalia Mivi', 'Negro', 36, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Mivi.jpg', 6000, 1, 6000, 1, 18, 8, '2021-03-05 02:38:43','2021-03-05 02:38:56',NULL),
    (17, 'Sandalia Barbie', 'Negro', 36, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Barbie.jpg', 7000, 1, 7000, 1, 19, 9, '2021-03-05 02:39:13','2021-03-05 02:39:24',NULL),
    (18, 'Sandalia Faira', 'Marron', 36, 'Casual', 'Sandalia de Plataforma de cuero. Base de goma, 4cm de plataforma y 11cm de taco.','img_Faira.jpg', 6000, 1, 6000, 1, 19, 9, '2021-03-05 02:39:18','2021-03-05 02:39:24',NULL),
    (19, 'Botineta Colonia', 'Negro', 36, 'Sale', 'Botinetas de cuero combinado, taco aguja. Suela rigida, con tope de goma antideslizante en el taco, altura 9 cm.','img_Colonia.jpg', 6000, 1, 4500, 1, 19, 9, '2021-03-05 02:39:22','2021-03-05 02:39:24',NULL),
    (20, 'Sandalia Bella', 'Negro', 36, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bella.jpg', 7000, 1, 7000, 1, 20, 10,'2021-03-05 02:39:39','2021-03-05 02:39:51',NULL),
    (21, 'Botineta Detroit', 'Marron', 36, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 1, 4800, 1, 20, 10,'2021-03-05 02:39:48','2021-03-05 02:39:51',NULL),
    (22, 'Sandalia Bemili', 'Negro', 37, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de Glitter con aplique de flores. Taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bemili.jpg', 7000, 1, 7000, 1, 21, 11,'2021-03-05 02:40:09','2021-03-05 02:40:21',NULL),
    (23, 'Sandalia Fiama', 'Marron', 37, 'Casual', 'Sandalia de Plataforma de cuero simil reptil. Base de goma, 4cm de plataforma y 11cm de taco.','img_Fiama.jpg', 6000, 1, 6000, 1, 21, 11,'2021-03-05 02:40:14','2021-03-05 02:40:21',NULL),
    (24, 'Borcego Fresno', 'Negro', 37, 'Sale', 'Borcego de cuero con detalles de tachas, hebilla y cierres laterales. Plataforma de goma de 5cm.','img_Fresno.jpg', 6000, 1, 4200, 1, 21, 11,'2021-03-05 02:40:19','2021-03-05 02:40:21',NULL),
    (25, 'Sandalia Berenice', 'Negro', 37, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero y taco forrado en el mismo material con tachas. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Berenice.jpg', 7000, 1, 7000, 1, 22, 12,'2021-03-05 02:40:54','2021-03-05 02:41:05',NULL),
    (26, 'Sandalia Maira', 'Marron', 37, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Maira.jpg', 6000, 1, 6000, 1, 22, 12,'2021-03-05 02:40:59','2021-03-05 02:41:05',NULL),
    (27, 'Mule Gina', 'Marron', 37, 'Sale', 'Mule de cuero marron. Capellada con detalle de rosa bordada y herraje. El interior se encuentra forrado en simil cuero. La suela es de goma antideslizante.','img_Gina.jpg', 6000, 1, 4500, 1, 22, 12,'2021-03-05 02:41:04','2021-03-05 02:41:05',NULL),
    (28, 'Sandalia Bernarda', 'Rojo', 37, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter con aplique de piedras, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bernarda.jpg', 7000, 1, 7000, 1, 23, 13,'2021-03-05 02:41:30','2021-03-05 02:41:43',NULL),
    (29, 'Sandalia Melisa', 'Marron', 37, 'Casual', 'Sandalia de cuero con detalle de capellada trenzada. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Melisa.jpg', 6000, 1, 6000, 1, 23, 13,'2021-03-05 02:41:36','2021-03-05 02:41:43',NULL),
    (30, 'Zapato Ines', 'Negro', 37, 'Sale', 'Zapato de plataforma de charol y raso. Plataforma de 4 cm y taco de 8 cm.','img_Ines.jpg', 6000, 1, 5100, 1, 23, 13,'2021-03-05 02:41:41','2021-03-05 02:41:43',NULL),
    (31, 'Sandalia Betania', 'Plata', 37, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Betania.jpg', 7000, 1, 7000, 1, 24, 14,'2021-03-05 02:41:57','2021-03-05 02:42:08',NULL),
    (32, 'Sandalia Mivi', 'Nude', 37, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Mivi.jpg', 6000, 1, 6000, 1, 24, 14,'2021-03-05 02:42:02','2021-03-05 02:42:08',NULL),
    (33, 'Bota Nantes', 'Negro', 37, 'Sale', 'Bota de cuero con detalle de tachas y cierres laterales. La plataforma y el taco son de goma.','img_Nantes.jpg', 6000, 1, 5100, 1, 24, 14,'2021-03-05 02:42:07','2021-03-05 02:42:08',NULL),
    (34, 'Sandalia Bianca', 'Oro', 37, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de raso y taco forrado con sintetico estampado. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bianca.jpg', 7000, 1, 7000, 1, 25, 15,'2021-03-05 02:42:37','2021-03-05 02:42:49',NULL),
    (35, 'Sandalia Pilar', 'Blanco', 37, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Pilar.jpg', 6000, 1, 6000, 1, 25, 15,'2021-03-05 02:42:44','2021-03-05 02:42:49',NULL),
    (36, 'Bota Texas', 'Blanco', 37, 'Sale', 'Bota texana confeccionada en cuero reptil, con detalle de herrajes y tachas. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Texas.jpg', 6000, 1, 3600, 1, 25, 15,'2021-03-05 02:42:48','2021-03-05 02:42:49',NULL),
    (37, 'Sandalia Briana', 'Negro', 37, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de raso, y taco forrado en glitter. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Briana.jpg', 7000, 1, 7000, 1, 26, 16,'2021-03-05 02:43:05','2021-03-05 02:43:17',NULL),
    (38, 'Sandalia Tini', 'Nude', 37, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Tini.jpg', 6000, 1, 6000, 1, 26, 16,'2021-03-05 02:43:11','2021-03-05 02:43:17',NULL),
    (39, 'Bota Tijuana', 'Marron', 37, 'Sale', 'Bota Texana de cuero, con detalle de flecos. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Tijuana.jpg', 6000, 1, 4500, 1, 26, 16,'2021-03-05 02:43:14','2021-03-05 02:43:17',NULL),
    (40, 'Sandalia Fiama', 'Negro', 37, 'Casual', 'Sandalia de Plataforma de cuero simil reptil. Base de goma, 4cm de plataforma y 11cm de taco.','img_Fiama.jpg', 6000, 1, 6000, 1, 27, 17,'2021-03-05 02:43:31','2021-03-05 02:43:37',NULL),
    (41, 'Mule Gina', 'Marron', 37, 'Sale', 'Mule de cuero marron. Capellada con detalle de rosa bordada y herraje. El interior se encuentra forrado en simil cuero. La suela es de goma antideslizante.','img_Gina.jpg', 6000, 2, 9000, 1, 28, 18,'2021-03-05 02:43:54','2021-03-05 02:44:02',NULL),
    (42, 'Botineta Colonia', 'Negro', 37, 'Sale', 'Botinetas de cuero combinado, taco aguja. Suela rigida, con tope de goma antideslizante en el taco, altura 9 cm.','img_Colonia.jpg', 6000, 1, 4500, 1, 29, 19,'2021-03-05 02:44:20','2021-03-05 02:44:32',NULL),
    (43, 'Zapato Ines', 'Negro', 37, 'Sale', 'Zapato de plataforma de charol y raso. Plataforma de 4 cm y taco de 8 cm.','img_Ines.jpg', 6000, 1, 5100, 1, 29, 19,'2021-03-05 02:44:29','2021-03-05 02:44:32',NULL),
    (44, 'Sandalia Betania', 'Negro', 37, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Betania.jpg', 7000, 1, 7000, 1, 30, 20,'2021-03-05 02:44:51','2021-03-05 02:45:02',NULL),
    (45, 'Botineta Detroit', 'Marron', 37, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 2, 9600, 1, 30, 20,'2021-03-05 02:45:00','2021-03-05 02:45:02',NULL),
    (46, 'Sandalia Felicitas', 'Negro', 37, 'Casual', 'Sandalia de Plataforma, detalle de trenzado en la capellada. Base de goma, 4cm de plataforma y 11cm de taco.','img_Felicitas.jpg', 6000, 1, 6000, 1, 31, 21,'2021-03-05 02:45:29','2021-03-05 02:45:30',NULL),
    (47, 'Borcego Fresno', 'Negro', 37, 'Sale', 'Borcego de cuero con detalles de tachas, hebilla y cierres laterales. Plataforma de goma de 5cm.','img_Fresno.jpg', 6000, 1, 4200, 1, 32, 22,'2021-03-05 02:45:44','2021-03-05 02:45:45',NULL),
    (48, 'Sandalia Berenice', 'Negro', 37, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero y taco forrado en el mismo material con tachas. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Berenice.jpg', 7000, 1, 7000, 1, 33, 23,'2021-03-05 02:45:58','2021-03-05 02:46:06',NULL),
    (49, 'Mule Gina', 'Marron', 38, 'Sale', 'Mule de cuero marron. Capellada con detalle de rosa bordada y herraje. El interior se encuentra forrado en simil cuero. La suela es de goma antideslizante.','img_Gina.jpg', 6000, 1, 4500, 1, 33, 23,'2021-03-05 02:46:04','2021-03-05 02:46:06',NULL),
    (50, 'Sandalia Melisa', 'Marron', 38, 'Casual', 'Sandalia de cuero con detalle de capellada trenzada. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Melisa.jpg', 6000, 1, 6000, 1, 34, 24,'2021-03-05 02:46:20','2021-03-05 02:46:26',NULL),
    (51, 'Botineta Detroit', 'Marron', 38, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 1, 4800, 1, 34, 24,'2021-03-05 02:46:24','2021-03-05 02:46:26',NULL),
    (52, 'Sandalia Briana', 'Oro', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de raso, y taco forrado en glitter. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Briana.jpg', 7000, 1, 7000, 1, 35, 25,'2021-03-05 02:46:42','2021-03-05 02:46:44',NULL),
    (53, 'Sandalia Fiama', 'Nude', 38, 'Casual', 'Sandalia de Plataforma de cuero simil reptil. Base de goma, 4cm de plataforma y 11cm de taco.','img_Fiama.jpg', 6000, 1, 6000, 1, 36, 26,'2021-03-05 02:46:56','2021-03-05 02:47:06',NULL),
    (54, 'Sandalia Tini', 'Nude', 38, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Tini.jpg', 6000, 1, 6000, 1, 36, 26,'2021-03-05 02:47:05','2021-03-05 02:47:06',NULL),
    (55, 'Sandalia Bemili', 'Negro', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de Glitter con aplique de flores. Taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bemili.jpg', 7000, 1, 7000, 1, 37, 27,'2021-03-05 02:47:27','2021-03-05 02:47:32',NULL),
    (56, 'Botineta Detroit', 'Marron', 38, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 1, 4800, 1, 37, 27,'2021-03-05 02:47:31','2021-03-05 02:47:32',NULL),
    (57, 'Botineta Detroit', 'Marron', 38, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 1, 4800, 1, 38, 28,'2021-03-05 02:47:44','2021-03-05 02:47:46',NULL),
    (58, 'Bota Tijuana', 'Marron', 38, 'Sale', 'Bota Texana de cuero, con detalle de flecos. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Tijuana.jpg', 6000, 1, 4500, 1, 39, 29,'2021-03-05 02:48:05','2021-03-05 02:48:06',NULL),
    (59, 'Sandalia Melisa', 'Nude', 38, 'Casual', 'Sandalia de cuero con detalle de capellada trenzada. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Melisa.jpg', 6000, 1, 6000, 1, 40, 30,'2021-03-05 02:48:22','2021-03-05 02:48:24',NULL),
    (60, 'Sandalia Pilar', 'Marron', 38, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Pilar.jpg', 6000, 1, 6000, 1, 41, 31,'2021-03-05 02:48:41','2021-03-05 02:48:42',NULL),
    (61, 'Sandalia Berenice', 'Negro', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero y taco forrado en el mismo material con tachas. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Berenice.jpg', 7000, 1, 7000, 1, 42, 32,'2021-03-05 02:48:56','2021-03-05 02:48:57',NULL),
    (62, 'Sandalia Bella', 'Rojo', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bella.jpg', 7000, 1, 7000, 1, 43, 33,'2021-03-05 02:49:13','2021-03-05 02:49:14',NULL),
    (63, 'Botineta Detroit', 'Marron', 38, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 1, 4800, 1, 44, 34,'2021-03-05 02:52:44','2021-03-05 02:52:45',NULL),
    (64, 'Bota Tijuana', 'Marron', 38, 'Sale', 'Bota Texana de cuero, con detalle de flecos. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Tijuana.jpg', 6000, 1, 4500, 1, 45, 35,'2021-03-05 02:52:59','2021-03-05 02:53:00',NULL),
    (65, 'Sandalia Barbie', 'Nude', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Barbie.jpg', 7000, 1, 7000, 1, 46, 36,'2021-03-05 02:53:11','2021-03-05 02:53:12',NULL),
    (66, 'Sandalia Bernarda', 'Rojo', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter con aplique de piedras, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bernarda.jpg', 7000, 1, 7000, 1, 46, 37,'2021-03-05 02:55:05','2021-03-05 02:55:07',NULL),
    (67, 'Sandalia Fiama', 'Marron', 38, 'Casual', 'Sandalia de Plataforma de cuero simil reptil. Base de goma, 4cm de plataforma y 11cm de taco.','img_Fiama.jpg', 6000, 1, 6000, 1, 47, 38,'2021-03-05 02:55:25','2021-03-05 02:55:27',NULL),
    (68, 'Sandalia Maira', 'Rojo', 38, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Maira.jpg', 6000, 1, 6000, 1, 47, 39,'2021-03-05 02:55:35','2021-03-05 02:55:37',NULL),
    (69, 'Sandalia Pilar', 'Blanco', 38, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Pilar.jpg', 6000, 1, 6000, 1, 49, 40,'2021-03-05 02:55:56','2021-03-05 02:55:57',NULL),
    (70, 'Sandalia Mivi', 'Negro', 38, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Mivi.jpg', 6000, 1, 6000, 1, 50, 41,'2021-03-05 02:56:19','2021-03-05 02:56:21',NULL),
    (71, 'Bota Nantes', 'Negro', 38, 'Sale', 'Bota de cuero con detalle de tachas y cierres laterales. La plataforma y el taco son de goma.','img_Nantes.jpg', 6000, 1, 5100, 1, 51, 42,'2021-03-05 02:56:36','2021-03-05 02:56:44',NULL),
    (72, 'Sandalia Tini', 'Nude', 38, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Tini.jpg', 6000, 1, 6000, 1, 51, 42,'2021-03-05 02:56:42','2021-03-05 02:56:44',NULL),
    (73, 'Sandalia Bernarda', 'Rojo', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter con aplique de piedras, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bernarda.jpg', 7000, 1, 7000, 1, 52, 43,'2021-03-05 02:57:05','2021-03-05 02:57:11',NULL),
    (74, 'Mule Gina', 'Marron', 38, 'Sale', 'Mule de cuero marron. Capellada con detalle de rosa bordada y herraje. El interior se encuentra forrado en simil cuero. La suela es de goma antideslizante.','img_Gina.jpg', 6000, 1, 4500, 1, 52, 43,'2021-03-05 02:57:09','2021-03-05 02:57:11',NULL),
    (75, 'Sandalia Betania', 'Oro', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Betania.jpg', 7000, 1, 7000, 1, 53, 44,'2021-03-05 02:57:29','2021-03-05 02:57:30',NULL),
    (76, 'Botineta Colonia', 'Negro', 38, 'Sale', 'Botinetas de cuero combinado, taco aguja. Suela rigida, con tope de goma antideslizante en el taco, altura 9 cm.','img_Colonia.jpg', 6000, 1, 4500, 1, 54, 45,'2021-03-05 02:57:48','2021-03-05 02:57:49',NULL),
    (77, 'Sandalia Maira', 'Marron', 38, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Maira.jpg', 6000, 1, 6000, 1, 55, 46,'2021-03-05 02:58:06','2021-03-05 02:58:08',NULL),
    (78, 'Bota Texas', 'Negro', 38, 'Sale', 'Bota texana confeccionada en cuero reptil, con detalle de herrajes y tachas. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Texas.jpg', 6000, 1, 3600, 1, 56, 47,'2021-03-05 02:58:26','2021-03-05 02:58:27',NULL),
    (79, 'Mule Gina', 'Marron', 38, 'Sale', 'Mule de cuero marron. Capellada con detalle de rosa bordada y herraje. El interior se encuentra forrado en simil cuero. La suela es de goma antideslizante.','img_Gina.jpg', 6000, 1, 4500, 1, 57, 48,'2021-03-05 02:58:46','2021-03-05 02:58:55',NULL),
    (80, 'Sandalia Faira', 'Nude', 38, 'Casual', 'Sandalia de Plataforma de cuero. Base de goma, 4cm de plataforma y 11cm de taco.','img_Faira.jpg', 6000, 1, 6000, 1, 57, 48,'2021-03-05 02:58:53','2021-03-05 02:58:55',NULL),
    (81, 'Sandalia Bernarda', 'Rojo', 38, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter con aplique de piedras, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bernarda.jpg', 7000, 1, 7000, 1, 58, 49,'2021-03-05 02:59:23','2021-03-05 02:59:26',NULL),
    (82, 'Botineta Detroit', 'Marron', 38, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 1, 4800, 1, 59, 50,'2021-03-05 02:59:40','2021-03-05 02:59:50',NULL),
    (83, 'Bota Tijuana', 'Marron', 38, 'Sale', 'Bota Texana de cuero, con detalle de flecos. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Tijuana.jpg', 6000, 1, 4500, 1, 59, 50,'2021-03-05 02:59:48','2021-03-05 02:59:50',NULL),
    (84, 'Sandalia Bella', 'Negro', 39, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bella.jpg', 7000, 1, 7000, 1, 60, 51,'2021-03-05 03:00:02','2021-03-05 03:00:10',NULL),
    (85, 'Sandalia Pilar', 'Blanco', 39, 'Casual', 'Sandalia cruzada de cuero con detalle de tachas en la capellada. Fondo de goma, 5 cm de alto.','img_Pilar.jpg', 6000, 1, 6000, 1, 60, 51,'2021-03-05 03:00:09','2021-03-05 03:00:10',NULL),
    (86, 'Sandalia Barbie', 'Negro', 39, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Barbie.jpg', 7000, 1, 7000, 1, 61, 52,'2021-03-05 03:00:28','2021-03-05 03:00:43',NULL),
    (87, 'Sandalia Maira', 'Rojo', 39, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Maira.jpg', 6000, 1, 6000, 1, 61, 52,'2021-03-05 03:00:34','2021-03-05 03:00:43',NULL),
    (88, 'Botineta Colonia', 'Negro', 39, 'Sale', 'Botinetas de cuero combinado, taco aguja. Suela rigida, con tope de goma antideslizante en el taco, altura 9 cm.','img_Colonia.jpg', 6000, 1, 4500, 1, 61, 52,'2021-03-05 03:00:42','2021-03-05 03:00:43',NULL),
    (89, 'Sandalia Berenice', 'Oro', 39, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero y taco forrado en el mismo material con tachas. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Berenice.jpg', 7000, 1, 7000, 1, 62, 53,'2021-03-05 03:00:56','2021-03-05 03:00:57',NULL),
    (90, 'Sandalia Briana', 'Oro', 39, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de raso, y taco forrado en glitter. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Briana.jpg', 7000, 1, 7000, 1, 63, 54 ,'2021-03-05 03:01:18','2021-03-05 03:01:20',NULL),
    (91, 'Sandalia Berenice', 'Negro', 39, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero y taco forrado en el mismo material con tachas. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Berenice.jpg', 7000, 1, 7000, 1, 57, 55,'2021-03-05 03:01:40','2021-03-05 03:01:41',NULL),
    (92, 'Bota Texas', 'Negro', 39, 'Sale', 'Bota texana confeccionada en cuero reptil, con detalle de herrajes y tachas. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Texas.jpg', 6000, 1, 3600, 1, 52, 56 ,'2021-03-05 03:02:06','2021-03-05 03:02:07',NULL),
    (93, 'Sandalia Mivi', 'Negro', 39, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Mivi.jpg', 6000, 1, 6000, 1, 45, 57,'2021-03-05 03:02:20','2021-03-05 03:02:21',NULL),
    (94, 'Bota Nantes', 'Negro', 39, 'Sale', 'Bota de cuero con detalle de tachas y cierres laterales. La plataforma y el taco son de goma.','img_Nantes.jpg', 6000, 1, 5100, 1, 41, 58,'2021-03-05 03:02:36','2021-03-05 03:02:37',NULL),
    (95, 'Sandalia Betania', 'Plata', 39, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter calada con brillos, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Betania.jpg', 7000, 1, 7000, 1, 33, 59,'2021-03-05 03:02:57','2021-03-05 03:03:03',NULL),
    (96, 'Sandalia Felicitas', 'Marron', 39, 'Casual', 'Sandalia de Plataforma, detalle de trenzado en la capellada. Base de goma, 4cm de plataforma y 11cm de taco.','img_Felicitas.jpg', 6000, 1, 6000, 1, 33, 59,'2021-03-05 03:03:02','2021-03-05 03:03:03',NULL),
    (97, 'Botineta Detroit', 'Marron', 39, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 1, 4800, 1, 29, 60,'2021-03-05 03:03:23','2021-03-05 03:03:24',NULL),
    (98, 'Botineta Detroit', 'Marron', 39, 'Sale', 'Botinetas de cuero con detalle de tachas. Suela de goma antideslizante y taco cuadrado de 9 cm de alto.','img_Detroit.jpg', 6000, 1, 4800, 1, 23, 61,'2021-03-05 03:03:40','2021-03-05 03:03:41',NULL),
    (99, 'Bota Tijuana', 'Marron', 39, 'Sale', 'Bota Texana de cuero, con detalle de flecos. El interior esta forrado en tela y material simil cuero. Su suela y taco son de goma con antideslizante, altura del taco 4 cm.','img_Tijuana.jpg', 6000, 1, 4500, 1, 20, 62,'2021-03-05 03:03:55','2021-03-05 03:04:02',NULL),
    (100, 'Sandalia Bella', 'Rojo', 40, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de cuero con detalle reptil, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bella.jpg', 7000, 1, 7000, 1, 20, 62,'2021-03-05 03:04:00','2021-03-05 03:04:02',NULL),
    (101, 'Sandalia Briana', 'Negro', 40, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de raso, y taco forrado en glitter. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Briana.jpg', 7000, 1, 7000, 1, 18, 63,'2021-03-05 03:05:22','2021-03-05 03:05:25',NULL),
    (102, 'Sandalia Bernarda', 'Rojo', 40, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter con aplique de piedras, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bernarda.jpg', 7000, 1, 7000, 1, 12, 64,'2021-03-05 03:11:45','2021-03-05 03:12:02',NULL),
    (103, 'Sandalia Maira', 'Rojo', 40, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Maira.jpg', 6000, 1, 6000, 1, 12, 64,'2021-03-05 03:11:50','2021-03-05 03:12:02',NULL),
    (104, 'Borcego Fresno', 'Negro', 40, 'Sale', 'Borcego de cuero con detalles de tachas, hebilla y cierres laterales. Plataforma de goma de 5cm.','img_Fresno.jpg', 6000, 1, 4200, 1, 12, 64,'2021-03-05 03:12:01','2021-03-05 03:12:02',NULL),
    (105, 'Zapato Ines', 'Negro', 40, 'Sale', 'Zapato de plataforma de charol y raso. Plataforma de 4 cm y taco de 8 cm.','img_Ines.jpg', 6000, 1, 5100, 1, 33, 65,'2021-03-05 03:12:31','2021-03-05 03:12:32',NULL),
    (106, 'Sandalia Bernarda', 'Rojo', 40, 'Fiesta', 'Sandalia de fiesta con plataforma alta. Capellada de glitter con aplique de piedras, y taco forrado en el mismo material. La suela es de material rigido sintetico, con tope de goma en el taco. Plataforma de 5 cm de alto y 11 cm de taco.','img_Bernarda.jpg', 7000, 1, 7000, 1, 23, 66,'2021-03-05 03:13:09','2021-03-05 03:13:14',NULL),
    (107, 'Sandalia Maira', 'Rojo', 40, 'Casual', 'Sandalia de cuero. Fondo de madera con suelin de goma de 5 cm de plataforma y 11 cm de taco.','img_Maira.jpg', 6000, 1, 6000, 1, 23, 66,'2021-03-05 03:13:12','2021-03-05 03:13:14',NULL);
-- }