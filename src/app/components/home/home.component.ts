import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sidebarVisible: boolean = false;
  constructor(private router: Router) {}
  dropdownOpen = false;



  // sidebarVisible = false;

  // sidebaropen = true

 

  handleClick(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 400);
    // Your other click logic here
    console.log('Paragraph clicked!');
}



toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

Joinclass(){
  this.router.navigate(['/JoinClass']);
}

Createclass(){
   this.router.navigate(['/CreateClass'])
}

toggleSidebar() {
  this.sidebarVisible = !this.sidebarVisible;
}
// Opensidebar(){
//   this.sidebarVisible = !this.sidebarVisible;
// }



}
