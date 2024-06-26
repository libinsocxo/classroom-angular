import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { classroomstream } from '../../types';
import { ClassroomService } from '../services/classroom.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-streamdetails',
  standalone: true,
  imports: [    AvatarModule,
    AvatarGroupModule,NgxExtendedPdfViewerModule,CommonModule],
  templateUrl: './streamdetails.component.html',
  styleUrl: './streamdetails.component.scss'
})
export class StreamdetailsComponent {

  pdfSrc :string = "";
  constructor(private route:ActivatedRoute,private roomservice:ClassroomService,private router:Router){
    this.pdfSrc = "data:application/pdf;base64," + this.streamdetail.attachments;
  }

  streamdetail:classroomstream={
    id:"",
    for: [],
    classId: "",
    announcement:"",
    title: "",
    description: "",
    createdDate: "",
    attachments: {
      "base64string":"",
      "fileName":"",
      "mimeType":""
    }
  }

  streamid = ""
  streamurl = ""
  sidebarvisible: boolean = false;
  isOpened : boolean = false;


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

  backTohome(){
    this.router.navigate(['/home']);
  }

  async ngOnInit(){
    this.route.params.subscribe(params=>{
      this.streamid = params['id']
    })

   this.roomservice.GetClassdetails(`http://localhost:5234/api/Room/GetStreamDetailsOAuth/${this.streamid}`).subscribe({
    next:(data:classroomstream)=>{
      this.streamdetail = data;

      console.log(this.streamdetail)
    }
   })
   
  }

  getPdfFilenameFromBase64(base64String: string): string | null {
    if (base64String.startsWith('data:')) {

      const commaIndex = base64String.indexOf(',');
      if (commaIndex !== -1 && commaIndex < base64String.length - 5) {
     
        const metadata = base64String.substring(5, commaIndex);
        console.log('Metadata:', metadata); 
        const metadataParts = metadata.split(';');
        console.log('Metadata parts:', metadataParts);
        const filenamePart = metadataParts.find(part => part.trim().toLowerCase().startsWith('filename='));
        console.log(filenamePart)
        if (filenamePart) {
          // Extract the filename after '='
          const filename = filenamePart.substring(filenamePart.indexOf('=') + 1).trim();
          

          // Decode URI components to handle URL encoding
          return decodeURIComponent(filename);
      }
      }
    }
    return null;
  }

  openpdf(){
    console.log("heyy")
    console.log(this.streamdetail)
    const attachment  = this.streamdetail.attachments;
    if(attachment){
      const byteArray = new Uint8Array(
        atob(attachment.base64string)
          .split("")
          .map(char => char.charCodeAt(0))
      );
      const file = new Blob([byteArray], { type: "application/pdf" });
      const anchor = document.createElement('a');
      const fileURL = URL.createObjectURL(file);
      anchor.href = fileURL;
      anchor.target = '_self';
      anchor.click();
      URL.revokeObjectURL(fileURL);
      this.pdfSrc = fileURL;  
    }

  }

 

}
