# API Gateway - Luis Store

Este API Gateway centraliza el acceso a los microservicios de Products y Categories.

## Configuración

### Puertos:
- **Gateway**: `http://localhost:8080`
- **Products Service**: `http://localhost:8081` (interno)
- **Categories Service**: `http://localhost:8082` (interno)

### Rutas configuradas:

#### Products Service
- **GET** `/api/products` → `http://localhost:8081/api/products`
- **GET** `/api/products/{id}` → `http://localhost:8081/api/products/{id}`
- **POST** `/api/products` → `http://localhost:8081/api/products`
- **PUT** `/api/products/{id}` → `http://localhost:8081/api/products/{id}`
- **DELETE** `/api/products/{id}` → `http://localhost:8081/api/products/{id}`

#### Categories Service
- **GET** `/api/categories` → `http://localhost:8082/api/categories`
- **GET** `/api/categories/{id}` → `http://localhost:8082/api/categories/{id}`
- **POST** `/api/categories` → `http://localhost:8082/api/categories`
- **PUT** `/api/categories/{id}` → `http://localhost:8082/api/categories/{id}`
- **DELETE** `/api/categories/{id}` → `http://localhost:8082/api/categories/{id}`

## Cómo ejecutar

1. **Iniciar la base de datos MySQL** (Docker):
   ```bash
   # Asegúrate de que el contenedor MySQL esté ejecutándose
   docker ps
   ```

2. **Iniciar los microservicios**:
   ```bash
   # Terminal 1 - Products Service
   cd backend/products
   ./mvnw spring-boot:run

   # Terminal 2 - Categories Service  
   cd backend/categories
   ./mvnw spring-boot:run
   ```

3. **Iniciar el API Gateway**:
   ```bash
   # Terminal 3 - Gateway
   cd backend/gateway
   ./mvnw spring-boot:run
   ```

4. **Iniciar el Frontend**:
   ```bash
   # Terminal 4 - Angular Frontend
   cd frontend/app-products-and-categories
   npm start
   ```

## Endpoints de prueba

- **Gateway Health**: `http://localhost:8080/health`
- **Gateway Home**: `http://localhost:8080/`
- **Products via Gateway**: `http://localhost:8080/api/products`
- **Categories via Gateway**: `http://localhost:8080/api/categories`

## CORS

El Gateway está configurado para permitir solicitudes desde:
- `http://localhost:4200` (Angular Frontend)
- Cualquier origen durante desarrollo

## Frontend

El frontend Angular ahora apunta al Gateway (`localhost:8080`) en lugar de directamente a los microservicios.
