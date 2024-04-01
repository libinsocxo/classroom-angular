import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, Renderer2, booleanAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { flatMap } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Card } from 'react-bootstrap';
import { CardComponent } from '../../card/card.component';
import { ClassroomService } from '../../services/classroom.service';
import { Class } from '../../../types';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    AvatarModule,
    AvatarGroupModule,
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  sidebarvisible: boolean = false;

  isOpened : boolean = false;

  TeachingSection : boolean = false;

  EnrolledSection : boolean = false;

  classrooms:Class[]=[];

  constructor(private router: Router,private classroomservices: ClassroomService) {}

  dropdownOpen = false;

  handleClick(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 400);

}

showsidebar(){

  const screenWidth = window.innerWidth;
  if(screenWidth<=600){
    this.sidebarvisible=!this.sidebarvisible;
  }else{
    this.showsidebarweb();
  }
  
}


showsidebarweb(){
  //adding the css property for displaying the sidebar for web
  if(this.isOpened==false){
    var sidebar = document.getElementById("web-sidebar");
    sidebar?.classList.add("sidebar-opened")
    var homecontainer = document.getElementById("web-home-container")
    homecontainer?.classList.add("home-container-sidebaropen")
    var firstsectionsidebar = document.querySelector(".web-sidebar-icon-section-home-first-sec")
    firstsectionsidebar?.classList.add("web-sidebar-icon-section-home-first-sec-opened")
    var sidebar_icon_text_expanded = document.querySelectorAll(".sidebar-icon-text")
    sidebar_icon_text_expanded.forEach((ele)=>{
      ele.classList.add("sidebar-icon-text-expanded")
    })
    this.isOpened = true;
  }else{
    var sidebar = document.getElementById("web-sidebar");
    sidebar?.classList.remove("sidebar-opened")
    var homecontainer = document.getElementById("web-home-container")
    homecontainer?.classList.remove("home-container-sidebaropen")
    var firstsectionsidebar = document.querySelector(".web-sidebar-icon-section-home-first-sec")
    firstsectionsidebar?.classList.remove("web-sidebar-icon-section-home-first-sec-opened")
    var sidebar_icon_text_expanded = document.querySelectorAll(".sidebar-icon-text")
    sidebar_icon_text_expanded.forEach((ele)=>{
      ele.classList.remove("sidebar-icon-text-expanded")
    })
    this.isOpened = false;
  }

}



changestate(){
  
  this.sidebarvisible = false;
}

showteachings(){

  if(this.TeachingSection==false){
    var teachingsection = document.querySelector(".Teaching-section")
    teachingsection?.classList.add("Teaching-section-show")
    const teaching_icon = document.querySelector(".icon-teaching");
    teaching_icon?.classList.add("rotate-icon")
    this.TeachingSection = true;
  }else{
    var teachingsection = document.querySelector(".Teaching-section")
    teachingsection?.classList.remove("Teaching-section-show")
    const teaching_icon = document.querySelector(".icon-teaching");
    teaching_icon?.classList.remove("rotate-icon")
    this.TeachingSection = false;
  }

}
// enrolling-icon


showenrolled(){
  if(this.EnrolledSection==false){
    var enrolledsection = document.querySelector(".Enrolled-section")
    enrolledsection?.classList.add("Enrolled-section-show")
    const enrolling_icon = document.querySelector(".enrolling-icon");
    enrolling_icon?.classList.add("rotate-icon")
    this.EnrolledSection = true;
  }else{
    var enrolledsection = document.querySelector(".Enrolled-section")
    enrolledsection?.classList.remove("Enrolled-section-show")
    const enrolling_icon = document.querySelector(".enrolling-icon");
    enrolling_icon?.classList.remove("rotate-icon")
    this.EnrolledSection = false;
  }
}

onMouseleave(){
  if(this.TeachingSection == true){
    var teachingsection = document.querySelector(".Teaching-section")
    teachingsection?.classList.remove("Teaching-section-show")
    const teaching_icon = document.querySelector(".icon-teaching");
    teaching_icon?.classList.remove("rotate-icon")
    this.TeachingSection = false
  }
  if(this.EnrolledSection==true){
    var enrolledsection = document.querySelector(".Enrolled-section")
    enrolledsection?.classList.remove("Enrolled-section-show")
    const enrolling_icon = document.querySelector(".enrolling-icon");
    enrolling_icon?.classList.remove("rotate-icon")
    this.EnrolledSection = false;
  }
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

getclassrooms(){
  this.classroomservices.getMyClasses("").subscribe({
    next:(data:Class)=>{
       this.classrooms = data
    }
  })

}

ngOnInit(){
  this.getclassrooms()
}

}
