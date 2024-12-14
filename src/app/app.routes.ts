import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ServiceCrudComponent } from './components/service/service-crud/service-crud.component';
import { RegisterEoFormComponent } from './components/register-eo-form/register-eo-form.component';
import { RegisterSpFormComponent } from './components/register-sp-form/register-sp-form.component';
import { EditAuFormComponent } from './components/edit-au-form/edit-au-form.component';
import { EditEoFormComponent } from './components/edit-eo-form/edit-eo-form.component';
import { EditSpFormComponent } from './components/edit-sp-form/edit-sp-form.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FastRegisterComponent } from './components/fast-register/fast-register.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { EventTypesComponent } from './components/event-types/event-types.component';
import { CreateEventFormComponent } from './components/create-event-form/create-event-form.component';
import { EditEventFormComponent } from './components/edit-event-form/edit-event-form.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { CategoryCrudComponent } from './components/category/category-crud/category-crud.component';
import { ServiceDetailsComponent } from './components/service/service-details/service-details.component';
import { FollowedEventsComponent } from './components/followed-events/followed-events.component';
import { ProdcutDetailsComponent } from './components/product-details/prodcut-details.component';
import { MessagingPageComponent } from './components/messaging-page/messaging-page.component';
import { AdminUserReportsComponent } from './components/admin-user-reports/admin-user-reports/admin-user-reports.component';


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
            },
            {
                path: 'my_events',
                data:{
                    breadcrumb:'My events'
                },
                component: MyEventsComponent
            },
            {
                path: 'event-types',
                data:{
                    breadcrumb:'Event Types'
                },
                component: EventTypesComponent
            },
            {
                path: 'create-event',
                data:{
                    breadcrumb: null
                },
                component: CreateEventFormComponent
            },
            {
                path: 'edit-event',
                data:{
                    breadcrumb: null
                },
                component: EditEventFormComponent
            },
            {
                path: 'agenda',
                data:{
                    breadcrumb: null
                },
                component: AgendaComponent
            },
            {
                path: 'category',
                data: {
                    breadcrumb: 'Categories'
                },
                component: CategoryCrudComponent
            }
            ,
            {
                path: 'service/:id',
                data: {
                    breadcrumb: 'Service'
                },
                component: ServiceDetailsComponent
            },
            {
                path: 'product/:id',
                data: {
                    breadcrumb: 'Product'
                },
                component: ProdcutDetailsComponent
            },
            {
                path: 'followed-events',
                data: {
                    breadcrumb: 'Followed Events'
                },
                component: FollowedEventsComponent
            },
            {
                path: 'messenger',
                data: {
                    breadcrumb: 'Messenger'
                },
                component: MessagingPageComponent
            },
            {
                path: 'admin-user-reports',
                data: {
                    breadcrumb: 'User Reports'
                },
                component: AdminUserReportsComponent
            }
        ]
    },
    { path: '', component: LoginFormComponent},
    { path: 'change-password', component: ChangePasswordComponent},
    { path: 'register-au', component: FastRegisterComponent},
    { path: 'register-eo', component: RegisterEoFormComponent},
    { path: 'register-sp', component: RegisterSpFormComponent},
    { path: 'edit-au', component: EditAuFormComponent},
    { path: 'edit-eo', component: EditEoFormComponent},
    { path: 'edit-sp', component: EditSpFormComponent}
];
