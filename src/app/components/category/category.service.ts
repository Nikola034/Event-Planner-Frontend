import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GetAllCategoriesDto } from './category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<GetAllCategoriesDto> {
    return this.httpClient.get<GetAllCategoriesDto>(`${environment.apiUrl}merchandise/categories`);
  }
}
