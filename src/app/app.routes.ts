import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

export const routes: Routes = [
    {
        path: '',
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
    }

];
