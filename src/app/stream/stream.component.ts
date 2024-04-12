import { Component, Input } from '@angular/core';
import { ClassroomService } from '../services/classroom.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { classroomstream } from '../../types';


@Component({
  selector: 'app-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss'
})
export class StreamComponent {

  constructor (private classroomservice:ClassroomService,private route:ActivatedRoute,private router:Router){}


  @Input() classname!:string;
  logedInUserId = ""
  roomstreams:classroomstream[] = []
  roomstreamId = ""
  currentclassid = ""

  streamdetails(id:string | undefined){
   this.router.navigate([`class/${this.currentclassid}/stream/${id}`])
  }


  ngOnInit(){
    this.route.params.subscribe(params=>{
      const roomid = params['id']
      this.currentclassid = roomid;
    })
    let authData = JSON.parse(sessionStorage.getItem("loggedInUser") || "");
    this.logedInUserId = authData.sub;
    const payload = {
        "OAuthUserid":this.logedInUserId
    }
    this.classroomservice.GetRoomStreams(`http://localhost:5234/api/Room/GetMyStreamOauth/${this.currentclassid}`,payload).subscribe({
      next:(data)=>{
        this.roomstreams = data;
      }
    })
  }
}
