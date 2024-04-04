import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators ,ReactiveFormsModule, FormControl} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { ClassroomService } from '../../services/classroom.service';


@Component({
  selector: 'app-createclass',
  standalone: true,
  imports: [DialogModule,ButtonModule,ReactiveFormsModule],
  templateUrl: './createclass.component.html',
  styleUrl: './createclass.component.scss'
})
export class CreateclassComponent {
  
  createClassform:FormGroup;
  
  constructor(private classroomservices: ClassroomService){

    const authUserId = sessionStorage.getItem('authUserId');

    this.createClassform = new FormGroup({
      ClassName: new FormControl(),
      Description: new FormControl(),
      Subject: new FormControl(),
      OAuthUser:new FormControl(authUserId)
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
        console.log(data);
     }
    })

  }

//   showDialog() {
//     this.visible = true;
// }

}
