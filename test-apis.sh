#!/bin/bash

echo "🧪 Testing Luis Store APIs..."
echo ""

# Función para hacer petición GET y mostrar resultado
test_get() {
    local url=$1
    local description=$2
    
    echo "🔍 Testing: $description"
    echo "   URL: $url"
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" $url)
    http_status=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS\:.*//g')
    
    if [ $http_status -eq 200 ]; then
        echo "   ✅ Status: $http_status"
        echo "   📝 Response: $(echo $body | jq . 2>/dev/null || echo $body | head -c 100)"
    else
        echo "   ❌ Status: $http_status"
        echo "   📝 Response: $body"
    fi
    echo ""
}

# Esperar a que los servicios estén listos
echo "⏳ Esperando que los servicios estén disponibles..."
sleep 10

# Test Gateway
test_get "http://localhost:8080/health" "Gateway Health Check"

# Test Categories
test_get "http://localhost:8080/api/categories" "Categories List"

# Test Products
test_get "http://localhost:8080/api/products" "Products List"

# Test Frontend
echo "🔍 Testing: Frontend Availability"
frontend_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4200)
if [ $frontend_status -eq 200 ]; then
    echo "   ✅ Frontend Status: $frontend_status"
else
    echo "   ❌ Frontend Status: $frontend_status"
fi

echo ""
echo "🎯 URLs para testing manual:"
echo "   • Frontend:    http://localhost:4200"
echo "   • Gateway:     http://localhost:8080/health"
echo "   • Categories:  http://localhost:8080/api/categories"
echo "   • Products:    http://localhost:8080/api/products"
