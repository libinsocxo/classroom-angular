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
 
  @Input() sidebarVisible:boolean = false
  @Output() changethestateback = new EventEmitter<boolean>();
  
  onSidebarVisibleChange(visible: boolean) {
    if(visible==false){
      this.changethestateback.emit();
    }
  }
}
