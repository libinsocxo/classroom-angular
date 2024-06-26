import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationProps } from 'react-bootstrap';
import { Classroom, PaginationParams } from '../../types';
import { Observable, ObservableLike } from 'rxjs';
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

  Unenrolclass = (url:string,body:any):Observable<any>=>{
   return this.apiService.post(url,body,{
    responseType:"json"
   })
  }

  Removeclassroom = (url:string,body:any):Observable<any>=>{
    return this.apiService.post(url,body,{
      responseType:"json"
    })
  }

  GetClassdetails = (url:string):Observable<any>=>{
    return this.apiService.get(url,{
      responseType:'json'
    })
  }

  GetRoomStreams = (url:string,body:any):Observable<any>=>{
    return this.apiService.post(url,body,{
      responseType:'json'
    })
  }

  GetStreamdetails = (url:string):Observable<any>=>{
    return this.apiService.get(url,{
      responseType:'json'
    })
  }

  Getpeoples = (url:string):Observable<any>=>{
    return this.apiService.get(url,{
      responseType:'json'
    })
  }

  SetStreamclassroom = (url:string,body:any):Observable<any>=>{
    return this.apiService.post(url,body,{
      responseType:'json'
    })
  }




}
