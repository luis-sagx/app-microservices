package com.example.products.services;

import com.example.products.models.entities.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAllProducts();
    Optional<Product> getProductById(long id);
    Product createProduct(Product product);
    Product updateProduct(long id, Product product);
    void deleteProduct(long id);
    long countProducts();
}
