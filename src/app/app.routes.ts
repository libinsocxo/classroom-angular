import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JoinclassComponent } from './components/joinclass/joinclass.component';
import { CreateclassComponent } from './components/createclass/createclass.component';
import { CardComponent } from './card/card.component';
import { LoginOAuthComponent } from './login-oauth/login-oauth.component';
import { RoomComponent } from './room/room.component';
import { StreamComponent } from './stream/stream.component';
import { ClassworkComponent } from './classwork/classwork.component';
import { PeopleComponent } from './people/people.component';
import { StreamdetailsComponent } from './streamdetails/streamdetails.component';
import { MaterialUploadComponent } from './material-upload/material-upload.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginOAuthComponent
     },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'JoinClass',
        component:JoinclassComponent
    },
    {
        path:'CreateClass',
        component:CreateclassComponent
    },
    {
        path:'class/:id/:string',
        component:RoomComponent,children:[
            {
              path:'stream',
              component:StreamComponent
            },
            {
              path:'classwork',
              component:ClassworkComponent
            },
            {
              path:'people',
              component:PeopleComponent
            }
        ]
    },
    {
        path:'class/:id/stream/:id',
        component:StreamdetailsComponent
    },
    {
        path:'uploadmaterial/:id',
        component:MaterialUploadComponent
    }


];
