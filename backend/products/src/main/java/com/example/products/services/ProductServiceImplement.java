package com.example.products.services;

import com.example.products.models.entities.Product;
import com.example.products.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImplement implements ProductService{
    private final ProductRepository productRepository;

    public ProductServiceImplement(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return  (List<Product>) productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(long id, Product product) {
        if(!productRepository.existsById(id)){
            throw new IllegalArgumentException("Product with id " + id + " does not exist.");
        } else {
            product.setId(id);
            return productRepository.save(product);
        }
    }

    @Override
    public void deleteProduct(long id) {
        if(!productRepository.existsById(id)){
            throw new IllegalArgumentException("Product with id " + id + " does not exist.");
        } else {
            productRepository.deleteById(id);
        }
    }

    @Override
    public long countProducts() {
        return productRepository.count();
    }

}
