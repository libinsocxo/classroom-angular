import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JoinclassComponent } from './components/joinclass/joinclass.component';
import { CreateclassComponent } from './components/createclass/createclass.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'JoinClass',
        component:JoinclassComponent
    },
    {
        path:'CreateClass',
        component:CreateclassComponent
    }
];
