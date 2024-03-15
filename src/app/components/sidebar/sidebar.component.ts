import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule,ButtonModule,NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // sidebarVisible: boolean = false;

  @Input() sidebarVisible:boolean =false
  // @Output() changethestateback = new EventEmitter<any>();
  
  // onSidebarVisibleChange(visible: boolean) {
  //   // this.changethestateback.emit();
  //   // You can perform any actions here based on the sidebar visibility change
  //   console.log("Sidebar visibility changed:", visible);
  // }
}
