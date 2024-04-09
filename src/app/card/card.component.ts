import { Component, Input } from '@angular/core';
import { Classroom } from '../../types';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { ClassroomService } from '../services/classroom.service';
import  ObjectId  from 'bson-objectid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

constructor(private classroomservice:ClassroomService,private homeapi:HomeComponent,private router:Router){}
@Input() classroom!:Classroom;
@Input() BackgroundImage!:string;

isDropdownOpen: boolean = false;
isAuther : boolean = false
Username : string = ""

classroomid : string = "";

logedInUser: string = ""

// classid:string = ""

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;  
}

unenrollclass(){
 console.log(this.classroom.classCode)
  const body ={
    "classcode":this.classroom.classCode,
    "Oauthuserid":this.logedInUser
  }
  this.classroomservice.Unenrolclass("http://localhost:5234/api/Room/UnEnrollClassOAuth",body).subscribe({
    next:(data)=>{
      this.homeapi.getclassrooms();
    },
    error(err) {
      alert("Error occured while Unenrolling!!")
    },
  })
}

Removeclassroom(){
  const body ={
    "classcode":this.classroom.classCode
  }

  this.classroomservice.Removeclassroom("http://localhost:5234/api/Room/Removeclassroom",body).subscribe({
    next:(data)=>{
      this.homeapi.getclassrooms()
    },
    error(err){
      alert("Error occured while removing the class")
    }
  })
}

Gotoclassroom(){
 console.log(this.classroom.id)
 this.router.navigate([`class/${this.classroom.id}/stream`])
}

ngOnInit(){

  let classroom_Author = this.classroom.oAuthUser;
  let logedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "")
  this.logedInUser = logedInUser.sub
  this.Username = logedInUser.name;
  if(classroom_Author==logedInUser.sub){
    this.isAuther = true;
  }
}

}
