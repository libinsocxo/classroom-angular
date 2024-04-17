import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators ,ReactiveFormsModule, FormControl} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { ClassroomService } from '../../services/classroom.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-createclass',
  standalone: true,
  imports: [DialogModule,ButtonModule,ReactiveFormsModule],
  templateUrl: './createclass.component.html',
  styleUrl: './createclass.component.scss'
})
export class CreateclassComponent {
  
  createClassform:FormGroup;
 
  
  constructor(private classroomservices: ClassroomService,private homeapi:HomeComponent){

    let authData = JSON.parse(sessionStorage.getItem("loggedInUser") || "");

    this.createClassform = new FormGroup({
      ClassName: new FormControl(),
      Description: new FormControl(),
      Subject: new FormControl(),
      Students: new FormControl([]),
      Author:new FormControl({
        "AuthorName":authData.name,
        "AuthorID":authData.sub,
        "AuthorProfile":authData.picture
      })
    })
  }

  visible: boolean = false;

  @Input() dialogVisible:boolean = false
  @Output() closedialogbox = new EventEmitter<boolean>();
  
  onSidebarVisibleChange(visible: boolean) {
    if(visible==false){
      this.closedialogbox.emit();
    }
  }

  canceldialogbox(){
    this.dialogVisible = false;
  }

  // isFormValid():boolean{
  //   const classNameControl = this.form.get('className');
  //   const descriptionControl = this.form.get('description');
  //   if(classNameControl && descriptionControl){
  //     return classNameControl.valid && descriptionControl.valid;
  //   }else{
  //     return false
  //   }
    
  // }

  Createclass(){
    const formData = this.createClassform.value;

    console.log(formData);

    this.classroomservices.CreateClassroom("http://localhost:5234/api/Room/CreateRoomOAuth",formData).subscribe({
      next:(data)=>{
        this.homeapi.getclassrooms();
        this.dialogVisible = false;
     },
     error:(error)=>{
      alert("Something went wrong!");
      console.error("classroom creating error occured while creating the room",error)
     }
    })

  }



}
