import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ClassworkComponent } from '../classwork/classwork.component';
import { PeopleComponent } from '../people/people.component';
import { CommonModule } from '@angular/common';
import { StreamComponent } from '../stream/stream.component';
import { ClassroomService } from '../services/classroom.service';
import {  Classroom } from '../../types';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [    AvatarModule,
    CommonModule,
    AvatarGroupModule,
    ClassworkComponent,
    PeopleComponent,
    StreamComponent,
    RouterModule
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  constructor(private router:Router,private route:ActivatedRoute,private classroomservice:ClassroomService){}
  currentclassid = 0;
  activeLink: string | null = null;
  sidebarvisible: boolean = false;
  isOpened : boolean = false;
  // classdetails: Classroom[]=[];
  className = "";
  UserProfile = "";
  navigatetoclasswork(){
    this.router.navigate([`class/${this.currentclassid}/classwork`])
    this.activeLink = 'classwork'
  }
  navigatetopeople(){
    this.router.navigate([`class/${this.currentclassid}/people`])
    this.activeLink = 'people'
  }
  navigatetostream(){
    this.router.navigate([`class/${this.currentclassid}/stream`])
    this.activeLink = 'stream'
  }

  backTohome(){
    this.router.navigate(['/home'])
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


  ngOnInit(){
    // this.activeLink = 'stream'
    this.route.params.subscribe(params=>{
      const section = params['string']
      const roomid = params['id']
      this.currentclassid = roomid;
      this.showComponentBasedOnPath(section);
    })

    console.log(this.currentclassid);

    this.classroomservice.GetClassdetails(`http://localhost:5234/api/Room/GetClassDetailsOAuth/${this.currentclassid}`).subscribe({
      next:(data)=>{
  
        this.className = data.className;
      },
      error:(err)=>{
        alert("something went wrong while getting the class details!")
      }
    })

    let authData = JSON.parse(sessionStorage.getItem("loggedInUser") || "");
    this.UserProfile = authData.picture;
    
  }

  showComponentBasedOnPath(path: string) {

    if(path === 'stream'){
      this.activeLink = 'stream'
      this.showstream = true;
      this.showclasswork = false;
      this.showpeople = false;
    }
   
    if (path === 'classwork') {
      this.activeLink = 'classwork'
      this.showclasswork = true;
      this.showpeople = false;
      this.showstream = false;
    } else if (path === 'people') {
      this.activeLink = 'people'
      this.showclasswork = false;
      this.showpeople = true;
      this.showstream = false;
    } else {
      this.showclasswork = false;
      this.showpeople = false;
    }
  }

  showclasswork: boolean = false;
  showpeople: boolean = false;
  showstream : boolean = true;

}
