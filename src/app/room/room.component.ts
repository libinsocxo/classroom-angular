import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [    AvatarModule,
    AvatarGroupModule,],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {

}
