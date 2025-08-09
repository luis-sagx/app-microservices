# 🏪 Luis Store - Microservices Architecture

## 📋 Descripción del Proyecto

Luis Store es una aplicación completa de e-commerce desarrollada con arquitectura de microservicios, que incluye:

- **Microservicio Categories**: Gestión de categorías de productos
- **Microservicio Products**: Gestión de productos (con relación a categorías)
- **API Gateway**: Punto único de entrada con manejo de CORS
- **Frontend Angular**: Interfaz de usuario responsive
- **Base de datos MySQL**: Almacenamiento persistente con datos iniciales

## 🏗️ Arquitectura

```
Frontend (Angular:4200) → Gateway (Spring:8080) → {
    Products Service (Spring:8081)
    Categories Service (Spring:8082)
} → MySQL (3309)
```

## 📦 Datos Iniciales

La aplicación se inicia automáticamente con:

### 📂 Categorías:
1. **Electrónicos** - Dispositivos electrónicos y gadgets
2. **Ropa** - Prendas de vestir y accesorios  
3. **Hogar** - Artículos para el hogar y decoración

### 🛍️ Productos:
1. **Smartphone Samsung** ($599.99) - Categoría: Electrónicos
2. **Laptop HP** ($899.99) - Categoría: Electrónicos
3. **Camiseta Nike** ($29.99) - Categoría: Ropa
4. **Jeans Levis** ($79.99) - Categoría: Ropa
5. **Lámpara LED** ($49.99) - Categoría: Hogar

## 🚀 Despliegue Local

### Opción 1: Desarrollo (Build local)
```bash
./deploy.sh build
```

### Opción 2: Producción (Imágenes de Docker Hub)
```bash
./deploy.sh prod
```

## 🐳 Docker Hub

### Subir imágenes a Docker Hub:
1. Editar `build-and-push.sh` y cambiar `DOCKER_USERNAME`
2. Ejecutar:
```bash
./build-and-push.sh
```

### Imágenes disponibles:
- `luisstore/categories-service:latest`
- `luisstore/products-service:latest`
- `luisstore/api-gateway:latest`
- `luisstore/frontend-angular:latest`

## 🛠️ Comandos Útiles

```bash
# Ver estado de servicios
./deploy.sh status

# Ver logs
./deploy.sh logs
./deploy.sh logs mysql

# Detener servicios
./deploy.sh stop

# Limpiar sistema Docker
./deploy.sh clean
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:4200
- **API Gateway**: http://localhost:8080
- **Products API**: http://localhost:8080/api/products
- **Categories API**: http://localhost:8080/api/categories
- **MySQL**: localhost:3309

## 📱 Funcionalidades

### Frontend Angular:
- ✅ Listado de productos con categorías
- ✅ Crear/Editar/Eliminar productos
- ✅ Asignar categoría a productos
- ✅ Búsqueda por nombre, descripción o categoría
- ✅ Gestión completa de categorías
- ✅ Interfaz responsive con Tailwind CSS

### Backend:
- ✅ API RESTful completa
- ✅ Validación de datos
- ✅ Relaciones entre productos y categorías
- ✅ Manejo de CORS centralizado
- ✅ Logs detallados para debugging
- ✅ Health checks

## 🔧 Configuración

### Variables de Entorno:
- `DB_HOST`: Host de MySQL
- `DB_PORT`: Puerto de MySQL
- `DB_DATABASE`: Nombre de la base de datos
- `DB_USER`: Usuario de MySQL
- `DB_PASSWORD`: Contraseña de MySQL
- `PORT`: Puerto del servicio
- `PRODUCTS_SERVICE_URL`: URL del servicio de productos
- `CATEGORIES_SERVICE_URL`: URL del servicio de categorías

## 🧪 Testing

### Postman Collection:
Las APIs están disponibles en:
- GET/POST/PUT/DELETE http://localhost:8080/api/products
- GET/POST/PUT/DELETE http://localhost:8080/api/categories

### Healthcheck:
- Gateway: http://localhost:8080/health
- Products: http://localhost:8081/actuator/health
- Categories: http://localhost:8082/actuator/health

## 🚨 Troubleshooting

### Problemas comunes:
1. **Puerto ocupado**: Cambiar puertos en docker-compose.yml
2. **Base de datos no conecta**: Verificar que MySQL esté saludable
3. **CORS errors**: Solo el Gateway maneja CORS
4. **Servicios no responden**: Verificar logs con `./deploy.sh logs`

### Verificar servicios:
```bash
# Ver contenedores activos
docker ps

# Ver logs de un servicio
docker logs <container_name>

# Conectar a MySQL
docker exec -it mystore-db-luis mysql -u root -padmin
```

## 👥 Autor

**Luis** - Desarrollo Full Stack  
*Curso: Web Avanzado - ESPE*

## 📄 Licencia

Este proyecto es para fines educativos.
