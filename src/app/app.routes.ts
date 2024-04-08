import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JoinclassComponent } from './components/joinclass/joinclass.component';
import { CreateclassComponent } from './components/createclass/createclass.component';
import { CardComponent } from './card/card.component';
import { LoginOAuthComponent } from './login-oauth/login-oauth.component';
import { RoomComponent } from './room/room.component';

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
        path:'class/:id',
        component:RoomComponent
    }
];
