import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/api/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Category> {
    if (!id) return throwError(() => new Error('ID de categoría inválido'));
    return this.http.get<Category>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(category: Category): Observable<Category> {
    if (!category || !category.name) {
      return throwError(() => new Error('Categoría inválida'));
    }
    return this.http.post<Category>(this.apiUrl, category)
      .pipe(catchError(this.handleError));
  }

  update(id: number, category: Category): Observable<Category> {
    if (!id || !category) {
      return throwError(() => new Error('Datos inválidos para actualizar categoría'));
    }
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    if (!id) return throwError(() => new Error('ID inválido para eliminar categoría'));
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
