package com.example.categories.services;

import com.example.categories.models.entities.Category;
import com.example.categories.repositories.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryServiceImplement implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImplement(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return (List<Category>) categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category createCategory(Category category) {
        validate(category);
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(long id, Category category) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("La categoría con id " + id + " no existe.");
        }
        validate(category);
        category.setId(id);
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(long id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("La categoría con id " + id + " no existe.");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public long countProducts() {
        return categoryRepository.count();
    }

    private void validate(Category category) {
        if (category.getName() == null || category.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es obligatorio.");
        }
        if (category.getName().length() < 3 || category.getName().length() > 50) {
            throw new IllegalArgumentException("El nombre debe tener entre 3 y 50 caracteres.");
        }
        if (category.getDescription() != null && category.getDescription().length() > 255) {
            throw new IllegalArgumentException("La descripción no debe superar los 255 caracteres.");
        }
    }


}
