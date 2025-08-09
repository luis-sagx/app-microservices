import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models';
import { CategoryService } from './category';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`; 

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getAllWithCategories(): Observable<Product[]> {
    return forkJoin({
      products: this.getAll(),
      categories: this.categoryService.getAll()
    }).pipe(
      map(({ products, categories }) => {
        return products.map(product => ({
          ...product,
          categoria: product.categoriaId ? 
            categories.find(c => c.id === product.categoriaId) : undefined
        }));
      }),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Product> {
    if (!id) return throwError(() => new Error('ID de producto inválido'));
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(product: Product): Observable<Product> {
    if (!product || !product.name || !product.price) {
      return throwError(() => new Error('Producto inválido'));
    }
    return this.http.post<Product>(this.apiUrl, product)
      .pipe(catchError(this.handleError));
  }

  update(id: number, product: Product): Observable<Product> {
    if (!id || !product) {
      return throwError(() => new Error('Datos inválidos para actualizar'));
    }
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    if (!id) return throwError(() => new Error('ID inválido para eliminar'));
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error desconocido';
    console.error('Error HTTP:', msg);
    return throwError(() => new Error(msg));
  }
}
