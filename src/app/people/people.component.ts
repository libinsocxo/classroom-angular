import { Component } from '@angular/core';
import { ClassroomService } from '../services/classroom.service';
import { classroompeople } from '../../types';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  

  constructor(private classroomservice:ClassroomService,private route:ActivatedRoute){}

  
  classid = ""

  totalpeoplecount = 0;

  classroomplp: classroompeople = {
    author: {
        authorID: "",
        authorName: "",
        authorProfile: ""
    },
    students: [
        {
            userProfile: "",
            userID: "",
            username: ""
        },
    ]
};


  ngOnInit(){
    this.route.params.subscribe(params=>{
       this.classid = params['id']
    })
   this.classroomservice.Getpeoples(`http://localhost:5234/api/Room/GetPeopledetailsOAuth/${this.classid}`).subscribe({
    next:(data)=>{
     this.classroomplp.author = data.author;
     this.classroomplp.students = data.students;
     this.totalpeoplecount = this.classroomplp.students.length;
    },
    error:(error)=>{
      alert(error)
    }
   })
  }
}
