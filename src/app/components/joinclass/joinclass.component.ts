import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ClassroomService } from '../../services/classroom.service';
declare var handleSignout:any;

@Component({
  selector: 'app-joinclass',
  standalone: true,
  imports: [InputTextModule,CommonModule,FormsModule],
  templateUrl: './joinclass.component.html',
  styleUrl: './joinclass.component.scss'
})
export class JoinclassComponent {

  constructor(private router:Router,private classroomservice:ClassroomService){}
   
  value: string | undefined;

  UserGivenName = "";
  
  UserEmail  = "";

  UserId = "";

  UserProfile : any;

  Switchaccount(){
    console.log("clcick")
    handleSignout();
    sessionStorage.removeItem("loggedInUser");
    this.router.navigate([""]).then(()=>{
      window.location.reload();
    })
  }

  closejoinclass(){
    this.router.navigate(["/home"])
  }

  Joinclass(){
    console.log(this.value);
    const payload = {
      "ClassCode":this.value,
      "OAuthUserId":this.UserId
    }
    this.classroomservice.JoinClassroom("http://localhost:5234/api/Room/JoinclassOAuth",payload).subscribe({
      next:()=>{
        this.router.navigate(["/home"])
      }
    })
    
  }

  ngOnInit(){
    let authData = JSON.parse(sessionStorage.getItem("loggedInUser") || "");
    this.UserEmail = authData.email;
    this.UserGivenName = authData.name;
    this.UserProfile = authData.picture;
    this.UserId = authData.sub;
  }



}
