package com.example.categories.services;

import com.example.categories.models.entities.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(long id);
    Category createCategory(Category category);
    Category updateCategory(long id, Category category);
    void deleteCategory(long id);
    long countProducts();
}
