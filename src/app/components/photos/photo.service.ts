import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MerchandiseOverviewDTO } from '../merchandise/merchandise-overview-dto';
import { environment } from '../../../environments/environment';
import { JwtService } from '../auth/jwt.service';
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

  // Ovako ce se pozivati iz svakog ts-a
  // photoUrls: string[] = []
  // filenames: string[] = ['nutria.jpg']
  // this.photoUrls = this.filenames.map((filename) =>
  //   this.photoService.getPhotoUrl(filename)
  // );
}
