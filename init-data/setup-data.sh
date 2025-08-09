#!/bin/bash

# Este script se ejecutará DESPUÉS de que MySQL esté listo
# pero esperará a que los microservicios creen las tablas

echo "📊 Esperando que las tablas sean creadas por los microservicios..."

# Esperar hasta que las tablas existan
wait_for_table() {
    local table_name=$1
    echo "⏳ Esperando tabla $table_name..."
    
    while ! mysql -h mysql -u root -padmin -e "USE mystore_luis2; DESCRIBE $table_name;" >/dev/null 2>&1; do
        sleep 2
        echo "   Still waiting for $table_name..."
    done
    
    echo "✅ Tabla $table_name encontrada"
}

# Esperar a que MySQL esté disponible
while ! mysql -h mysql -u root -padmin -e "SELECT 1;" >/dev/null 2>&1; do
    echo "⏳ Esperando MySQL..."
    sleep 2
done

echo "✅ MySQL está disponible"

# Esperar a que existan las tablas (creadas por Hibernate)
wait_for_table "categories"
wait_for_table "products"

echo "📝 Insertando datos iniciales..."

# Insertar datos
mysql -h mysql -u root -padmin mystore_luis2 <<EOF
-- Insertar categorías iniciales
INSERT IGNORE INTO categories (name, description, date_creation) VALUES 
('Electrónicos', 'Dispositivos electrónicos y gadgets', NOW()),
('Ropa', 'Prendas de vestir y accesorios', NOW()),
('Hogar', 'Artículos para el hogar y decoración', NOW());

-- Insertar productos iniciales
INSERT IGNORE INTO products (name, description, price, categoria_id) VALUES 
('Smartphone Samsung', 'Teléfono inteligente con pantalla AMOLED', 599.99, 1),
('Laptop HP', 'Computadora portátil para trabajo y estudio', 899.99, 1),
('Camiseta Nike', 'Camiseta deportiva de algodón', 29.99, 2),
('Jeans Levis', 'Pantalón denim clásico', 79.99, 2),
('Lámpara LED', 'Lámpara de escritorio con control táctil', 49.99, 3);
EOF

echo "✅ Datos iniciales insertados correctamente"
