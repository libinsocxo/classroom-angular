import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-material-upload',
  standalone: true,
  imports: [ButtonModule,InputTextModule,EditorModule,FormsModule],
  templateUrl: './material-upload.component.html',
  styleUrl: './material-upload.component.scss'
})
export class MaterialUploadComponent {
 @ViewChild('fileInput') fileInput: any;
 title:string =""
 html = '';
 
 dropdownboxvisible: boolean = false;
 constructor(){}
 
 uploadFile() {
  if (this.fileInput) {
    this.fileInput.nativeElement.click();
  }
}

handleFileInput(event: any) {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    console.log("Selected file:", file);
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


 somefunction(){
  console.log(this.html);
  console.log(this.title);
 }

 ngOnInit(){

 }

}
