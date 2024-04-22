import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-classwork',
  standalone: true,
  imports: [],
  templateUrl: './classwork.component.html',
  styleUrl: './classwork.component.scss'
})
export class ClassworkComponent {

  constructor(private router:Router,private route:ActivatedRoute){}
  
  classid = ""





   
  ngOnInit(){
    this.route.params.subscribe(params=>{
     
      this.classid = params['id']
    })
  }
  uploadmaterial(){
    this.router.navigate([`uploadmaterial/${this.classid}`])
  }

}
