#!/bin/bash

echo "🚀 Desplegando Luis Store - Arquitectura Completa"
echo ""

# Función para mostrar el estado de los servicios
show_status() {
    echo "📊 Estado de los servicios:"
    echo ""
    docker-compose -f docker-compose.yml ps
    echo ""
}

# Función para mostrar los logs
show_logs() {
    local service=$1
    if [ -n "$service" ]; then
        echo "📋 Logs de $service:"
        docker-compose -f docker-compose.yml logs --tail=50 $service
    else
        echo "📋 Logs de todos los servicios:"
        docker-compose -f docker-compose.yml logs --tail=20
    fi
}

# Función principal de deployment
deploy() {
    echo "🛑 Deteniendo servicios existentes..."
    docker-compose -f docker-compose.yml down
    
    echo ""
    echo "🗑️ Limpiando imágenes obsoletas..."
    docker system prune -f
    
    echo ""
    echo "🔨 Construyendo y levantando servicios..."
    docker-compose -f docker-compose.yml up --build -d
    
    echo ""
    echo "⏳ Esperando que los servicios estén listos..."
    sleep 30
    
    echo ""
    show_status
    
    echo ""
    echo "🌐 URLs disponibles:"
    echo "   • Frontend:    http://localhost:4200"
    echo "   • Gateway:     http://localhost:8080"
    echo "   • Products:    http://localhost:8081/api/products"
    echo "   • Categories:  http://localhost:8082/api/categories"
    echo "   • MySQL:       localhost:3309"
    echo ""
    echo "✅ Deployment completado!"
}

# Función para deployment de producción
deploy_prod() {
    echo "🚀 Desplegando desde imágenes de Docker Hub..."
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml pull
    docker-compose -f docker-compose.prod.yml up -d
    
    show_status
}

# Menú principal
case "$1" in
    "build")
        deploy
        ;;
    "prod")
        deploy_prod
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs $2
        ;;
    "stop")
        echo "🛑 Deteniendo todos los servicios..."
        docker-compose -f docker-compose.yml down
        echo "✅ Servicios detenidos"
        ;;
    "clean")
        echo "🧹 Limpiando sistema Docker..."
        docker-compose -f docker-compose.yml down
        docker system prune -af
        docker volume prune -f
        echo "✅ Sistema limpio"
        ;;
    *)
        echo "📖 Uso del script:"
        echo ""
        echo "  ./deploy.sh build    - Construir y desplegar localmente"
        echo "  ./deploy.sh prod     - Desplegar desde Docker Hub"
        echo "  ./deploy.sh status   - Ver estado de servicios"
        echo "  ./deploy.sh logs     - Ver logs de todos los servicios"
        echo "  ./deploy.sh logs mysql - Ver logs de un servicio específico"
        echo "  ./deploy.sh stop     - Detener todos los servicios"
        echo "  ./deploy.sh clean    - Limpiar sistema Docker"
        echo ""
        ;;
esac
