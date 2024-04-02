import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationProps } from 'react-bootstrap';
import { Classroom, PaginationParams } from '../../types';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private apiService: ApiService) { }

  getMyClasses = (
    url:string
  ):Observable<any> =>{
    const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibGliMTIzIiwiZXhwIjoxNzEyMDQxNzQzLCJpc3MiOiJodHRwczovL2xpYmlubHV2aXMubmV0bGlmeS5hcHAvIiwiYXVkIjoiaHR0cHM6Ly9saWJpbmx1dmlzLm5ldGxpZnkuYXBwLyJ9.aNqxNuOLJyiVjDc4SfhXrEtbd_kOuhidC3zrftbuWY0";
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${auth_token}`
    })
    return this.apiService.get(url,{
      headers:headers,
      responseType:'json',
    });
  };


}
