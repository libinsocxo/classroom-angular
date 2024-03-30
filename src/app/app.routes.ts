import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JoinclassComponent } from './components/joinclass/joinclass.component';
import { CreateclassComponent } from './components/createclass/createclass.component';
import { CardComponent } from './card/card.component';

export const routes: Routes = [
    {
        path:'',
        component:CardComponent
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
