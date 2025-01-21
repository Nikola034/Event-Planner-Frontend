import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryDto, GetAllCategoriesDto } from './model/category.dto';
import { API_URL } from '../../../globals';
import { CreateCategory } from './model/create-request';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { UpdateCategory } from './model/update-request';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<GetAllCategoriesDto> {
    return this.httpClient.get<GetAllCategoriesDto>(`${environment.apiUrl}merchandise/categories`);
  }

  getAllApproved(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(`${API_URL}/api/v1/categories/get/approved`);
  }

  getAllPending(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(`${API_URL}/api/v1/categories/get/pending`);
  }

  create(createRequest: CreateCategory): Observable<CategoryDto> {
    return this.httpClient.post<CategoryDto>(`${API_URL}/api/v1/categories/create`, createRequest);
  }

  approve(categoryId: number): Observable<CategoryDto> {
    return this.httpClient.put<CategoryDto>(`${API_URL}/api/v1/categories/approve/${categoryId}`, categoryId);
  }

  update(categoryId: number, updateRequest: UpdateCategory): Observable<CategoryDto> {
    return this.httpClient.put<CategoryDto>(`${API_URL}/api/v1/categories/update/${categoryId}`, updateRequest);
  }

  delete(categoryId: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URL}/api/v1/categories/delete/${categoryId}`);
  }

  replace(categoryId: number, replacedCategoryId: number): Observable<any> {
    return this.httpClient.put<any>(`${API_URL}/api/v1/categories/replace/${categoryId}/${replacedCategoryId}`, null);
  }
}
