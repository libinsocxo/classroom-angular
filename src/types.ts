import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}


export interface PaginationParams {
    [param: string]:
      | string
      | number
      | boolean
      | ReadonlyArray<string | number | boolean>;
    page: number;
    perPage: number;
  }



export interface Classroom{
    id?:string,
    className?:string,
    description?:string,
    section?:string,
    subject?:string,
    classCode?:string,
    students?:[],
    author?:JSON,
    oAuthUser?:string
}

export interface classroomstream{
  id?:string,
  for?: [],
  classId?: string,
  announcement?: string,
  title?: string,
  description?: string,
  createdDate?: string,
  attachments?: string
}

