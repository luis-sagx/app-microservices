#!/bin/bash

echo "🔄 Reiniciando servicios para aplicar cambios CORS..."

# Función para detener procesos Java por puerto
kill_service_by_port() {
    local port=$1
    local service_name=$2
    echo "🛑 Deteniendo $service_name (puerto $port)..."
    
    # Buscar el PID del proceso que usa el puerto
    local pid=$(lsof -ti:$port)
    if [ ! -z "$pid" ]; then
        kill -9 $pid
        echo "✅ $service_name detenido (PID: $pid)"
        sleep 2
    else
        echo "ℹ️  $service_name no estaba ejecutándose"
    fi
}

# Detener servicios existentes
kill_service_by_port 8080 "Gateway"
kill_service_by_port 8081 "Products Service"
kill_service_by_port 8082 "Categories Service"

echo ""
echo "🚀 Iniciando servicios..."
echo ""

# Verificar que MySQL esté ejecutándose
echo "🔍 Verificando MySQL..."
if docker ps | grep -q mystore-db-luis; then
    echo "✅ MySQL está ejecutándose"
else
    echo "❌ MySQL no está ejecutándose. Iniciándolo..."
    docker start mystore-db-luis
    sleep 5
fi

echo ""
echo "📝 Para iniciar los servicios manualmente, ejecuta estos comandos en terminales separadas:"
echo ""
echo "Terminal 1 - Products Service:"
echo "cd backend/products && ./mvnw spring-boot:run"
echo ""
echo "Terminal 2 - Categories Service:"
echo "cd backend/categories && ./mvnw spring-boot:run"
echo ""
echo "Terminal 3 - Gateway:"
echo "cd backend/gateway && ./mvnw spring-boot:run"
echo ""
echo "Terminal 4 - Frontend:"
echo "cd frontend/app-products-and-categories && npm start"
echo ""
echo "🎯 Una vez iniciados todos los servicios, el frontend estará disponible en:"
echo "http://localhost:4200"
echo ""
echo "🌐 API Gateway estará en:"
echo "http://localhost:8080"
