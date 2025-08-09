#!/bin/bash

DOCKER_USERNAME="luissagx" 
VERSION="1.0"

echo "🐳 Construyendo y subiendo imágenes a Docker Hub..."
echo ""

# Función para build y push
build_and_push() {
    local service_name=$1
    local dockerfile_path=$2
    local image_name="${DOCKER_USERNAME}/${service_name}:${VERSION}"
    local latest_name="${DOCKER_USERNAME}/${service_name}:latest"
    
    echo "🔨 Construyendo ${service_name}..."
    docker build -t $image_name -t $latest_name $dockerfile_path
    
    if [ $? -eq 0 ]; then
        echo "✅ Build exitoso para ${service_name}"
        echo "📤 Subiendo ${service_name} a Docker Hub..."
        
        docker push $image_name
        docker push $latest_name
        
        if [ $? -eq 0 ]; then
            echo "✅ ${service_name} subido exitosamente"
        else
            echo "❌ Error al subir ${service_name}"
        fi
    else
        echo "❌ Error en build de ${service_name}"
    fi
    echo ""
}

# Login a Docker Hub
echo "🔐 Por favor inicia sesión en Docker Hub:"
docker login

echo ""
echo "🚀 Iniciando build y push de todos los servicios..."
echo ""

# Build y push de cada servicio
build_and_push "categories-service2" "./backend/categories"
build_and_push "products-service2" "./backend/products"
build_and_push "api-gateway2" "./backend/gateway"
build_and_push "frontend-angular2" "./frontend/app-products-and-categories"

echo ""
echo "🎉 ¡Proceso completado!"
echo ""
echo "📋 Imágenes creadas:"
echo "   • ${DOCKER_USERNAME}/categories-service:${VERSION}"
echo "   • ${DOCKER_USERNAME}/products-service:${VERSION}"
echo "   • ${DOCKER_USERNAME}/api-gateway:${VERSION}"
echo "   • ${DOCKER_USERNAME}/frontend-angular:${VERSION}"
echo ""
echo "🚀 Para usar las imágenes:"
echo "   docker-compose -f docker-compose.prod.yml up -d"
