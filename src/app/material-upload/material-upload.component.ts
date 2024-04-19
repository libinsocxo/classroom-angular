import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ClassroomService } from '../services/classroom.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { listofstudents } from '../../types';



@Component({
  selector: 'app-material-upload',
  standalone: true,
  imports: [ButtonModule,InputTextModule,EditorModule,FormsModule,CommonModule],
  templateUrl: './material-upload.component.html',
  styleUrl: './material-upload.component.scss'
})
export class MaterialUploadComponent {
 @ViewChild('fileInput') fileInput: any;
 title:string ="";
 html = '';
 base64file:string = "";
 base64filename:string = "";
 base64filetype:string = "";
 activeclassid = "";
 
 dropdownboxvisible: boolean = false;

 getclassroompeople = {
   students:[{
    "userID":"",
    "userProfile":"",
    "username":""
   }]
 }

 listofstudents:any[] = []
 
 constructor(private classroomservice:ClassroomService,
  private route:ActivatedRoute,private router:Router){}
 
 uploadFile() {
  if (this.fileInput) {
    this.fileInput.nativeElement.click();
  }
}



readFileAsBase64(file: File): Promise<{ filename: string; filetype: string; base64: string   }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string; // Explicitly cast to string
      if (result && result.includes(',')) {
        const base64String = result.split(',')[1];
        const dataUri = result.split(',')[0];
        const match = dataUri.match(/:(.*?);/);
        if (match && match[1]) {
          const mimeType = match[1];
          const base64WithMeta = `filename:${file.name};filetype:${mimeType};base64,${base64String}`;
          resolve({
            filename: file.name,
            filetype: mimeType,
            base64: base64String
          });
        } else {
          reject(new Error('Failed to extract MIME type'));
        }
      } else {
        reject(new Error('Invalid file format or empty result'));
      }
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}





async handleFileInput(event: any) {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    if (file) {
      try {
        const fileData = await this.readFileAsBase64(file);
        this.base64file = fileData.base64;
        this.base64filename = fileData.filename;
        this.base64filetype = fileData.filetype
      } catch (error) {
        alert('Error reading file:')
        console.error('Error reading file:', error);
      }
    }

  }
}

opendropdown(){
  if(this.dropdownboxvisible==false){
    const dropdown = document.getElementById("Dropdownbox")
    dropdown?.classList.add('dropdown-box-open')
    this.dropdownboxvisible=!this.dropdownboxvisible;
    
  }else{
    const dropdown = document.getElementById("Dropdownbox")
    dropdown?.classList.remove('dropdown-box-open')
    this.dropdownboxvisible=!this.dropdownboxvisible;
  }

}




 Uploadmaterial(){
  const body = {
    For:this.listofstudents,
    ClassId:this.activeclassid,
    Title:this.title,
    Description:this.html,
    Attachments:{
      "Base64string":this.base64file,
      "FileName":this.base64filename,
      "MimeType":this.base64filetype
    }
  }
  this.classroomservice.SetStreamclassroom('http://localhost:5234/api/Room/RoomStreamOAuth',body).subscribe({
    next:(data)=>{
      console.log(data)
    },
    error:(error)=>{
      console.log(error)
    }
  })
 }

 checkboxChanged(student:any){
  let index = this.listofstudents.findIndex(obj=>obj.userID===student.userID)
  if(index!==-1){
    this.listofstudents.splice(index,1)
  }else{
    this.listofstudents.push({
      "userID":student.userID,
      "userProfile":student.userProfile,
      "username":student.username
    })
  }

 }

 backtoclassroom(){
  // http://localhost:4200/class/661f609c2e0bab729e00f4c2/classwork
  this.router.navigate([`class/${this.activeclassid}/classwork`])
 }

 ngOnInit(){
  this.route.params.subscribe(params=>{
    const classid = params['id']
    this.activeclassid = classid;
   
  })
   this.classroomservice.Getpeoples(`http://localhost:5234/api/Room/GetClassDetailsOAuth/${this.activeclassid}`).subscribe({
    next:(data)=>{
      this.getclassroompeople.students = data.students
      
    }
   })
 }

}
