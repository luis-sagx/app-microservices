-- Crear database si no existe
CREATE DATABASE IF NOT EXISTS mystore_luis2;
USE mystore_luis2;

-- Esperar a que las tablas sean creadas por Hibernate
-- Insertar categorías iniciales (esperamos 10 segundos para que Hibernate cree las tablas)
-- Este script se ejecuta DESPUÉS de que los microservicios hayan creado las tablas

-- Insertar categorías iniciales
INSERT IGNORE INTO categories (id, name, description, date_creation) VALUES 
(1, 'Electronica', 'Dispositivos electrónicos y gadgets', NOW()),
(2, 'Ropa', 'Prendas de vestir y accesorios', NOW()),
(3, 'Hogar', 'Artículos para el hogar y decoración', NOW());

-- Insertar productos iniciales
INSERT IGNORE INTO products (id, name, description, price, categoria_id) VALUES 
(1, 'Smartphone Samsung', 'Celular inteligente con pantalla AMOLED', 599.99, 1),
(2, 'Laptop HP', 'Computadora para trabajo y estudio', 899.99, 1),
(3, 'Camiseta Nike', 'Camiseta deportiva de tela suave', 29.99, 2),
(4, 'Jeans Levis', 'Pantalón denim ajustado', 79.99, 2),
(5, 'Lámpara LED', 'Lámpara de escritorio con control táctil', 49.99, 3);
