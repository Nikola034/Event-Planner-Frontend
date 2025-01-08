import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BudgetDTO } from './model/budget-dto';
import { UpdateBudgetRequestDTO } from './model/update-budget-request-dto';
import { createBudgetRequestDTO } from './model/add-budget-request-dto';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  getBudgetByEventId(eventId: number): Observable<BudgetDTO> {
    return this.http.get<BudgetDTO>(`${environment.apiUrl}budget/event/${eventId}`);
  }

  createBudgetItem(budgetId: number, requestDTO: createBudgetRequestDTO): Observable<BudgetDTO> {
    return this.http.post<BudgetDTO>(`${environment.apiUrl}budget/create/${budgetId}`, requestDTO);
  }

  updateBudgetItem(budgetItemId: number, requestDTO: UpdateBudgetRequestDTO): Observable<BudgetDTO> {
    return this.http.put<BudgetDTO>(`${environment.apiUrl}budget/update/${budgetItemId}`, requestDTO);
  }

  deleteBudgetItem(budgetItemId: number, budgetId: number): Observable<BudgetDTO> {
    return this.http.put<BudgetDTO>(`${environment.apiUrl}budget/delete/${budgetId}/${budgetItemId}`, null);
  }
}
