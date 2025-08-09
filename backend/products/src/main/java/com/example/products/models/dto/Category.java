package com.example.products.models.dto;

import java.time.LocalDateTime;

public class Category {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime dateCreation;

    public Category() {
    }

    public Category(Long id, String name, String description, LocalDateTime dateCreation) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dateCreation = dateCreation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
}
