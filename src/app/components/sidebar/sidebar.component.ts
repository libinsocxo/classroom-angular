import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule,ButtonModule,NgIf,AvatarModule,AvatarGroupModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
 
  @Input() sidebarVisible:boolean = false
  @Output() changethestateback = new EventEmitter<boolean>();

  UserName : string = "";

  USerEmail : string ="";

  UserProfile : any;
  
  onSidebarVisibleChange(visible: boolean) {
    if(visible==false){
      this.changethestateback.emit();
    }
  }

  ngOnInit(){
    let authData = JSON.parse(sessionStorage.getItem("loggedInUser") || "");
    this.UserName = authData.name;
    this.USerEmail = authData.email;
    this.UserProfile = authData.picture;
  }
}
