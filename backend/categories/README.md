# Categories App - Spring Boot + Docker

Este proyecto es una API REST de ejemplo para la gestión de **categorías**, construida con **Spring Boot** y empaquetada en una imagen de Docker.

## Tecnologías usadas

- Java 17
- Spring Boot
- Maven
- Docker
- MySQL (conexión externa)
- Docker Hub

---

## Estructura básica del modelo

```java
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;         // Requerido, único, 3-50 caracteres
    private String description;  // Opcional, hasta 255 caracteres
    private LocalDateTime creationDate; // Asignado automáticamente al crear
}
```

---

## Cómo construir y ejecutar el contenedor

### 1. Clonar este repositorio

```bash
git clone https://github.com/luis-sagx/Categories-SpringBoot.git
cd Categories-SpringBoot
```

### 2. Construir la imagen

```bash
docker build -t img-app-categories:v1 .
```

### 3. Crear una red de Docker (si no existe)

```bash
docker network create test-network
```

### 4. Ejecutar el contenedor

```bash
docker run -dit \
  -p 8082:8004 \
  --name c-app-categories \
  --network test-network \
  -e DB_HOST=test-db \
  -e DB_PORT=3306 \
  -e DB_DATABASE=test \
  -e DB_USER=root \
  -e DB_PASSWORD=admin \
  -e PORT=8004 \
  img-app-categories:v1
```

---

## Endpoints REST disponibles

- `POST /api/categories` – Crear categoría
- `GET /api/categories` – Listar todas las categorías
- `GET /api/categories/{id}` – Obtener categoría por ID
- `PUT /api/categories/{id}` – Actualizar categoría
- `DELETE /api/categories/{id}` – Eliminar categoría

---

## Validaciones implementadas

Las validaciones de los atributos del modelo `Category` se realizaron dentro del paquete `services`:

- **id**: `Long` — Auto-generado, clave primaria.
- **name**: `String` — Obligatorio, único, longitud entre 3 y 50 caracteres.
- **description**: `String` — Opcional, longitud máxima de 255 caracteres.
- **createdAt**: `LocalDateTime` — Asignada automáticamente al crear la categoría.

---

## Descargar y ejecutar desde otra máquina

1. Asegúrate de tener Docker instalado y de que tu instancia de MySQL esté corriendo en la misma red de Docker.
2. Descarga la imagen desde Docker Hub:

   ```bash
   docker pull luissagx/img-app-categories:v1
   ```

3. Ejecuta el contenedor con los siguientes parámetros (ajusta las variables de entorno según tu configuración de MySQL):

   ```bash
   docker run -dit \
     -p 8082:8004 \
     --name c-app-categories \
     --network test-network \
     -e DB_HOST=<nombre_host_mysql> \
     -e DB_PORT=3306 \
     -e DB_DATABASE=<nombre_base_de_datos> \
     -e DB_USER=<usuario_mysql> \
     -e DB_PASSWORD=<password_mysql> \
     -e PORT=8004 \
     luissagx/img-app-categories:v1
   ```

4. Accede a la API

   Puedes probar los endpoints usando Postman o cURL. Ejemplos:

   - **Listar categorías**  
     `GET http://localhost:8082/api/categories`

   - **Crear una categoría**  
     `POST http://localhost:8082/api/categories`  
     Body (JSON):
     ```json
     {
       "name": "Tecnología",
       "description": "Categoría de tecnología"
     }
     ```

   - **Obtener una categoría por ID**  
     `GET http://localhost:8082/api/categories/1`

   - **Actualizar una categoría**  
     `PUT http://localhost:8082/api/categories/1`  
     Body (JSON):
     ```json
     {
       "name": "Ciencia",
       "description": "Categoría actualizada"
     }
     ```

   - **Eliminar una categoría**  
     `DELETE http://localhost:8082/api/categories/1`

---

## Autor

Luis Sagnay