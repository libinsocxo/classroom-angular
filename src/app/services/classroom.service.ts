import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationProps } from 'react-bootstrap';
import { Class, PaginationParams } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private apiService: ApiService) { }

  getMyClasses = (
    url:string
  ):Observable<Class> =>{
    return this.apiService.get(url,{
      responseType:'json',
    });
  };


}
