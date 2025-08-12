# 🏪 Luis Store - Microservices Architecture

## 🌐 Acceso Público - Desplegado en AWS

**🔗 Link de Acceso Público:** http://18.117.19.207:4200  
**🔗 API Gateway:** http://18.117.19.207:8080  
**� Repositorio GitHub:** https://github.com/luis-sagx/app-microservices

 Base de datos:
```bash
# Conectar a MySQL desde el servidor
docker exec -it mystore-db-luis-prod mysql -u luis -padmin123 mystore_luis2

# Ver tablas
SHOW TABLES;
SELECT * FROM products;
SELECT * FROM categories;
```

## 📁 Estructura del Proyecto

```
deber_despliege/
├── backend/
│   ├── categories/          # Microservicio de categorías
│   │   ├── Dockerfile
│   │   ├── pom.xml
│   │   └── src/
│   ├── products/            # Microservicio de productos
│   │   ├── Dockerfile
│   │   ├── pom.xml
│   │   └── src/
│   └── gateway/             # API Gateway
│       ├── Dockerfile
│       ├── pom.xml
│       └── src/
├── frontend/
│   └── app-products-and-categories/  # Frontend Angular 20 
│       ├── Dockerfile
│       ├── angular.json
│       ├── package.json
│       └── src/
├── docker-compose.yml       # Orquestación de servicios
├── deploy.sh               # Script de despliegue
├── build-and-push.sh       # Build y push a Docker Hub
├── test-apis.sh            # Testing automático
├── AWS-DEPLOYMENT.md       # Documentación AWS
└── README.md              # Esta documentación
```is-sagx/app-microservices

## �📋 Descripción del Proyecto

Luis Store es una aplicación completa de e-commerce desarrollada con arquitectura de microservicios, desplegada en **AWS EC2** usando **Docker Compose**. El sistema incluye:

- **Microservicio Categories**: Gestión de categorías de productos
- **Microservicio Products**: Gestión de productos (con relación a categorías)
- **API Gateway**: Punto único de entrada con manejo de CORS
- **Frontend Angular**: Interfaz de usuario responsive
- **Base de datos MySQL**: Almacenamiento persistente con datos iniciales

## 🏗️ Arquitectura de Despliegue

```
Internet → AWS EC2 (18.117.19.207) → {
    Frontend (Angular:4200) → Gateway (Spring:8080) → {
        Products Service (Spring:8081)
        Categories Service (Spring:8082)
    } → MySQL (3309)
}
```

**Stack Tecnológico:**
- **Frontend**: Angular 20 (ng build --prod)
- **Backend**: Spring Boot con Java 17
- **Base de Datos**: MySQL 8.0 con persistencia
- **Orquestación**: Docker Compose
- **Plataforma**: AWS EC2 Ubuntu Linux
- **IP Elástica**: 18.117.19.207


## 🚀 Despliegue en AWS EC2

### 📝 Proceso de Despliegue (Dos Etapas)

#### **ETAPA 1: Build y Push (Local/Desarrollo)**

Desde tu máquina local, en la raíz del proyecto:

```bash
# 1. Construir y subir imágenes a Docker Hub
./build-and-push.sh
```

Este script:
- Construye todas las imágenes Docker
- Las sube a Docker Hub con tag `v3`
- Las hace disponibles públicamente

#### **ETAPA 2: Deploy en AWS EC2**

#### 1. **Conectar al servidor AWS:**
```bash
ssh -i tu_llave.pem ubuntu@18.117.19.207
```

#### 2. **Instalar Docker y Docker Compose (si no están instalados):**
```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
-o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# Cerrar sesión y volver a conectar para aplicar permisos de grupo
exit
ssh -i tu_llave.pem ubuntu@18.117.19.207

# Verificar instalación
docker --version
docker-compose --version
```

#### 3. **Descargar solo el docker-compose.yml:**
```bash
# Descargar el archivo docker-compose.yml directamente
wget https://raw.githubusercontent.com/luis-sagx/app-microservices/main/docker-compose.yml

# Verificar el archivo
cat docker-compose.yml
```

#### 4. **Configurar Security Group (AWS Console):**
Abrir los siguientes puertos en el Security Group:
- **22** - SSH
- **4200** - Frontend Angular
- **8080** - API Gateway (Principal)
- **8081** - Products Service
- **8082** - Categories Service
- **3309** - MySQL 

#### 5. **Ejecutar el despliegue:**
```bash
# Descargar las imágenes y ejecutar los contenedores
docker-compose up -d

# Verificar que todos los servicios estén corriendo
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f
```

#### 6. **Verificar el despliegue:**

```bash
# Verificar estado de contenedores
docker ps

# Verificar logs de servicios específicos
docker logs frontend-angular-prod
docker logs api-gateway-prod
docker logs mystore-db-luis-prod
```

**URLs de verificación:**
- **Frontend**: http://18.117.19.207:4200
- **API Gateway**: http://18.117.19.207:8080
- **Health Check**: http://18.117.19.207:8080/health

### 🔧 Comandos Útiles en AWS EC2

```bash
# Ver estado de servicios
docker-compose ps

# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs gateway

# Parar todos los servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Actualizar imágenes y reiniciar
docker-compose pull
docker-compose up -d
```

### 🔧 Configuración AWS Específica

El proyecto ha sido configurado específicamente para AWS:

1. **CORS habilitado** para permitir acceso desde cualquier origen
2. **IP Elástica** configurada en el frontend: `18.117.19.207:8080`
3. **Imágenes en Docker Hub** listas para pull automático
4. **Persistencia de datos** con volúmenes Docker
5. **Health checks** configurados para todos los servicios

### 💡 Ventajas de este Enfoque

✅ **No requiere clonar todo el repositorio** en AWS  
✅ **No hay problemas de permisos** con scripts  
✅ **Despliegue rápido** - solo docker-compose up  
✅ **Imágenes pre-construidas** en Docker Hub  
✅ **Fácil actualización** con docker-compose pull  

## 🐳 Docker Hub - Imágenes Desplegadas

### Imágenes disponibles en Docker Hub:
- `luissagx/categories-service2:v3` - Microservicio de categorías
- `luissagx/products-service2:v3` - Microservicio de productos  
- `luissagx/api-gateway2:v3` - API Gateway con CORS configurado
- `luissagx/frontend-angular2:v3` - Frontend Angular build producción

### Para actualizar imágenes:

**Desde tu máquina local:**
```bash
# Construir y subir nuevas versiones
./build-and-push.sh
```

**Desde AWS EC2:**
```bash
# Descargar imágenes actualizadas y reiniciar
docker-compose pull
docker-compose up -d
```

## 🛠️ Comandos Útiles

### En tu máquina local (desarrollo):
```bash
# Construir y subir imágenes actualizadas
./build-and-push.sh
```

### En AWS EC2 (producción):
```bash
# Ver estado de servicios
docker-compose ps

# Ver logs
docker-compose logs
docker-compose logs mysql

# Detener servicios
docker-compose down

# Actualizar imágenes desde Docker Hub
docker-compose pull
docker-compose up -d

# Reiniciar un servicio específico
docker-compose restart gateway

# Ver uso de recursos
docker stats
```

## 🌐 URLs de Acceso

### 🌍 **Producción (AWS EC2):**
- **Frontend**: http://18.117.19.207:4200
- **API Gateway**: http://18.117.19.207:8080
- **Products API**: http://18.117.19.207:8080/api/products
- **Categories API**: http://18.117.19.207:8080/api/categories
- **MySQL**: 18.117.19.207:3309

### 🏠 **Desarrollo Local:**
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

## 🧪 Testing y Verificación

### Verificación Manual desde AWS EC2:

```bash
# Verificar que todos los contenedores estén corriendo
docker ps

# Probar APIs directamente
curl http://localhost:8080/api/products
curl http://localhost:8080/api/categories
curl http://localhost:8080/health

# O desde cualquier navegador:
# http://18.117.19.207:4200 (Frontend)
# http://18.117.19.207:8080/api/products (API)
```

### Verificación desde cualquier ubicación:

#### **APIs REST (curl/Postman):**
```bash
# Listar productos
curl http://18.117.19.207:8080/api/products

# Listar categorías  
curl http://18.117.19.207:8080/api/categories

# Health check del gateway
curl http://18.117.19.207:8080/health
```

#### **Base de datos:**
```bash
# Conectar a MySQL desde el servidor
docker exec -it mystore-db-luis-prod mysql -u luis -padmin123 mystore_luis2

# Ver tablas
SHOW TABLES;
SELECT * FROM products;
SELECT * FROM categories;
```

## 🚨 Troubleshooting

### Problemas comunes en AWS:

#### **1. No se puede acceder al frontend:**
```bash
# Verificar que el contenedor esté corriendo
docker ps | grep frontend

# Verificar logs
docker logs frontend-angular-prod

# Verificar Security Group - Puerto 4200 debe estar abierto
```

#### **2. APIs no responden:**
```bash
# Verificar gateway
curl http://localhost:8080/health

# Ver logs del gateway
docker-compose logs gateway

# Verificar Security Group - Puerto 8080 debe estar abierto
```

#### **3. Base de datos no conecta:**
```bash
# Verificar que MySQL esté saludable
docker ps | grep mysql

# Ver logs de MySQL
docker-compose logs mysql

# Verificar conexión interna
docker exec -it mystore-db-luis-prod mysqladmin ping -h localhost -pluis
```

#### **4. Servicios no inician:**
```bash
# Ver logs de todos los servicios
docker-compose logs

# Reiniciar servicios
docker-compose down
docker-compose up -d

# Limpiar contenedores y reiniciar
docker-compose down
docker system prune -f
docker-compose up -d
```

### Comandos útiles para AWS:
```bash
# Ver uso de recursos
docker stats

# Ver espacio en disco
df -h

# Ver memoria
free -h

# Ver contenedores en ejecución
docker ps -a

# Reiniciar Docker daemon (si es necesario)
sudo systemctl restart docker
```

## � Requisitos Técnicos Cumplidos

✅ **Plataforma Cloud**: AWS EC2 Ubuntu Linux  
✅ **Contenedor MySQL**: Con persistencia de datos  
✅ **Contenedores Spring Boot**: APIs REST con Java 17  
✅ **Contenedor Angular**: Frontend con ng build --prod  
✅ **Docker Compose**: Orquestación completa de servicios  
✅ **Puerto expuesto**: Frontend accesible públicamente en puerto 4200  
✅ **Link público**: http://18.117.19.207:4200  
✅ **Repositorio GitHub**: https://github.com/luis-sagx/app-microservices  
✅ **README completo**: Con instrucciones de despliegue  

## �👥 Autor

**Luis Sagnay** 
*Materia: Web Avanzado - ESPE*  
*Tarea: Despliegue de Microservicios en AWS EC2*

