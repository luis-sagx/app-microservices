import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product';
import { CategoryService } from '../../../services/category';
import { Card } from '../../shared/card/card';
@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  totalProducts: number = 0;
  totalCategories: number = 0;

  constructor(private productService: ProductService, private categoryService: CategoryService) {}
  ngOnInit() {
    this.productService.getCount().subscribe({
      next: (amount) => this.totalProducts = amount,
      error: (err) => console.error('Error al obtener la cantidad de productos:', err)
    });

    this.categoryService.getCount().subscribe({
      next: (amount) => this.totalCategories = amount,
      error: (err) => console.error('Error al obtener la cantidad de categorías:', err)
    });
  }
}
