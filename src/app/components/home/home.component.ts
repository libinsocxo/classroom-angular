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


  sidebarvisible: boolean = false;

  constructor(private router: Router) {}

  dropdownOpen = false;

  handleClick(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 400);

}

showsidebar(){
  this.sidebarvisible=!this.sidebarvisible;
}

changestate(){
  
  this.sidebarvisible = false;
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

}
