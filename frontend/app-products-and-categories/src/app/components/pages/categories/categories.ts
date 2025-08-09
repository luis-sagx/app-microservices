import Swal from 'sweetalert2';

import { Component, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../services/category';
import { Category } from '../../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})

export class Categories implements OnInit {
  categories: Category[] = [];
  showModal = signal(false);
  selectedCategory: Category | null = null;
  searchTerm: string = '';

  form: Category = {
    name: '',
    description: '',
  };

  get filteredCategories(): Category[] {
    if (!this.searchTerm.trim()) return this.categories;
    const term = this.searchTerm.toLowerCase();
    return this.categories.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.description?.toLowerCase().includes(term)
    );
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: data => {
        this.categories = data;
        console.log('Categorías recibidas:', data);
      },
      error: error => {
        console.error('Error al cargar categorías', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error(err.message),
    });
  }

  openModal(category?: Category): void {
    this.selectedCategory = category || null;
    if (category) {
      this.form = { ...category };
    } else {
      this.form = {
        name: '',
        description: '',
      };
    }

    this.showModal.set(true);

  }

  closeModal(): void {
    this.showModal.set(false);
    this.selectedCategory = null;
    this.form = { 
      name: '', 
      description: '' 
    };
  }


  saveCategory(): void {
    if (!this.form.name || !this.form.description || this.form.name.trim() === '' || this.form.description.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente.',
      });
      return;
    }

    const action = this.selectedCategory?.id
      ? this.categoryService.update(this.selectedCategory.id, this.form)
      : this.categoryService.create(this.form);

    action.subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.selectedCategory?.id ? 'Categoría actualizada' : 'Categoría creada',
          timer: 1500,
          showConfirmButton: false,
        });
        this.loadCategories();
        this.closeModal();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
        });
      }
    });
  }

  deleteCategory(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Categoría eliminada',
              timer: 1500,
              showConfirmButton: false,
            });
            this.loadCategories();
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.message,
            });
          }
        });
      }
    });
  }

}