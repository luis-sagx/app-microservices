import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Categories } from './components/pages/categories/categories';
import { Products } from './components/pages/products/products';

export const routes: Routes = [
  { 
    path: '', 
    component: Home 
  },
  { 
    path: 'categories', 
    component: Categories 
  },
  { 
    path: 'products', 
    component: Products 
  },
];
