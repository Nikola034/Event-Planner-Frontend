import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryDto, GetAllCategoriesDto } from './category.dto';
import { API_URL } from '../../../globals';
import { CreateCategory } from './create-request';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { UpdateCategory } from './update-request';

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

  create(createRequest: CreateCategory): Observable<CategoryDto[]> {
    return this.httpClient.post<CategoryDto[]>(`${API_URL}/api/v1/categories/create`, createRequest);
  }

  approve(categoryId: number): Observable<CategoryDto[]> {
    return this.httpClient.put<CategoryDto[]>(`${API_URL}/api/v1/categories/approve/${categoryId}`, categoryId);
  }

  update(categoryId: number, updateRequest: UpdateCategory): Observable<CategoryDto[]> {
    return this.httpClient.put<CategoryDto[]>(`${API_URL}/api/v1/categories/update/${categoryId}`, updateRequest);
  }

  delete(categoryId: number): Observable<CategoryDto[]> {
    return this.httpClient.delete<CategoryDto[]>(`${API_URL}/api/v1/categories/delete/${categoryId}`);
  }
}
