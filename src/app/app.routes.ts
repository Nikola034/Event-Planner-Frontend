import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterEoFormComponent } from './components/register-eo-form/register-eo-form.component';
import { RegisterSpFormComponent } from './components/register-sp-form/register-sp-form.component';

export const routes: Routes = [
    {
        path: 'home',
        data:{
            breadcrumb:null
        },
        children: [
            {
                path: '',
                data:{
                    breadcrumb:null
                },
                component: HomePageComponent
            },
            {
                path: 'search',
                data:{
                    breadcrumb:'Search'
                },
                component: SearchPageComponent
            }
        ]
    },
    { path: '', component: LoginFormComponent},
    { path: 'register-eo', component: RegisterEoFormComponent},
    { path: 'register-sp', component: RegisterSpFormComponent}

];
