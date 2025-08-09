import Swal from 'sweetalert2';

import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product';
import { CategoryService } from '../../../services/category';
import { Product, Category } from '../../../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})

export class Products implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  showModal = signal(false);
  selectedProduct: Product | null = null;
  searchTerm: string = '';

  get filteredProducts(): Product[] {
    if (!this.searchTerm.trim()) return this.products;
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term) ||
      p.categoria?.name.toLowerCase().includes(term)
    );
  }

  form: Product = {
    name: '',
    description: '',
    price: 0,
    categoriaId: undefined
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAllWithCategories().subscribe({
      next: data => {
        this.products = data;
        console.log('Productos recibidos:', data);
      },
      error: error => {
        console.error('Error al cargar productos', error);
      }
    });
  }

  loadCategories(): void {
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

  openModal(product?: Product): void {
    this.selectedProduct = product || null;

    if (product) {
      this.form = { ...product };
    } else {
      this.form = {
        name: '',
        description: '',
        price: 0,
        categoriaId: undefined
      };
    }

    this.showModal.set(true);
  }


  closeModal(): void {
    this.showModal.set(false);
    this.selectedProduct = null;
    this.form = {
      name: '',
      description: '',
      price: 0,
      categoriaId: undefined
    };
  }


  saveProduct(): void {
    if (!this.form.name || !this.form.description || this.form.price <= 0  || this.form.name.trim() === '' || this.form.description.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente.',
      });
      return;
    }

    const action = this.selectedProduct?.id
      ? this.productService.update(this.selectedProduct.id, this.form)
      : this.productService.create(this.form);

    action.subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.selectedProduct?.id ? 'Producto actualizado' : 'Producto creado',
          timer: 1500,
          showConfirmButton: false,
        });
        this.loadProducts();
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

  deleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              timer: 1500,
              showConfirmButton: false,
            });
            this.loadProducts();
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

  getCategoryName(product: Product): string {
    return product.categoria?.name || 'Sin categoría';
  }

}