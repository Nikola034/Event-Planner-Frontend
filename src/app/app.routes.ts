import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ServiceCrudComponent } from './components/service-crud/service-crud.component';
import { RegisterEoFormComponent } from './components/register-eo-form/register-eo-form.component';
import { RegisterSpFormComponent } from './components/register-sp-form/register-sp-form.component';
import { FastRegisterComponent } from './fast-register/fast-register.component';


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
    { path: 'register-au', component: FastRegisterComponent},
    { path: 'register-eo', component: RegisterEoFormComponent},
    { path: 'register-sp', component: RegisterSpFormComponent}

];
