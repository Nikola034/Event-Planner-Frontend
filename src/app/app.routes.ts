import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterOdFormComponent } from './components/register-od-form/register-od-form.component';
import { RegisterPupFormComponent } from './components/register-pup-form/register-pup-form.component';
import { ServiceCrudComponent } from './components/service-crud/service-crud.component';

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
            },
            {
                path: 'my_services',
                data:{
                    breadcrumb:'My services'
                },
                component: ServiceCrudComponent
            }
        ]
    },
    { path: '', component: LoginFormComponent},
    { path: 'register-od', component: RegisterOdFormComponent},
    { path: 'register-pup', component: RegisterPupFormComponent},

];
