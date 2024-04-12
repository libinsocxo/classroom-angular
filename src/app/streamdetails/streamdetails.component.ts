import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-streamdetails',
  standalone: true,
  imports: [    AvatarModule,
    AvatarGroupModule],
  templateUrl: './streamdetails.component.html',
  styleUrl: './streamdetails.component.scss'
})
export class StreamdetailsComponent {
  constructor(private route:ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(params=>{
      console.log(params['id'])
    })
  }
}
