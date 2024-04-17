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

  ngOnInit(){
    this.activeLink = 'stream'
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
      this.showstream = true;
      this.showclasswork = false;
      this.showpeople = false;
    }
   
    if (path === 'classwork') {
      this.showclasswork = true;
      this.showpeople = false;
      this.showstream = false;
    } else if (path === 'people') {
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
