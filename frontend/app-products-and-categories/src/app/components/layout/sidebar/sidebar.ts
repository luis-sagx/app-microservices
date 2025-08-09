import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.sidebarOpen = this.isDesktop(); 
    });
  }

}