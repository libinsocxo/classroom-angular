import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationProps } from 'react-bootstrap';
import { Classroom, PaginationParams } from '../../types';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private apiService: ApiService) { }

  getMyClasses = (
    url:string,
    body:any
  ):Observable<any> =>{
    // const params = new HttpParams({ fromObject: body });
    return this.apiService.post(url,body,{
      // params: params,
      responseType:'json'
    });
  };

  CreateClassroom = (url:string,body:any):Observable<any>=>{
    return this.apiService.post(url,body,{
     responseType:'json'
    });
  }

  JoinClassroom = (url:string,body:any):Observable<any>=>{
    return this.apiService.post(url,body,{
      responseType:'json'
    })
  }


}
