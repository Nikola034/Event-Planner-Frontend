import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MerchandiseOverviewDTO } from '../../merchandise/merchandise/model/merchandise-overview-dto';
import { environment } from '../../../environments/environment';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import { Observable } from 'rxjs';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {}

  getPhotoAsBlob(filename: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}photos/${filename}`, { responseType: 'blob' });
  }

  getPhotoUrl(filename: string): string {
    return `${environment.apiUrl}photos/${filename}`;
  }

  deleteUserPhoto(id: number){
    return this.http.delete<number>(`${environment.apiUrl}photos/user/${id}`);
  }
  deleteMercPhoto(id: number | undefined, mercId: number | undefined, edit: boolean){
    return this.http.delete<number>(`${environment.apiUrl}photos/${mercId}/merchandise/${id}?edit=${edit}`);
  }
  deleteBusinessPhoto(id: number, spId: number | undefined, edit: boolean){
    return this.http.delete<number>(`${environment.apiUrl}photos/${spId}/business/${id}?edit=${edit}`);
  }

  uploadUserPhoto(file: File, id: number): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<number>(`${environment.apiUrl}photos/user/${id}`, formData);
  }

  uploadBusinessPhoto(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<number>(`${environment.apiUrl}photos/business`, formData);
  }

  uploadMerchandisePhoto(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<number>(`${environment.apiUrl}photos/merchandise`, formData);
  }

  // Ovako ce se pozivati iz svakog ts-a
  // photoUrls: string[] = []
  // filenames: string[] = ['nutria.jpg']
  // this.photoUrls = this.filenames.map((filename) =>
  //   this.photoService.getPhotoUrl(filename)
  // );
}
