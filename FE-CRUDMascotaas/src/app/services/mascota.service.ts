import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Mascota/';

  constructor(private http: HttpClient) {}

  getMascotas(): Observable<Mascota[]> {return this.http.get<Mascota[]>(`${this.myAppUrl}${this.myApiUrl}`); }


  getMascota(id: number): Observable<Mascota> {return this.http.get<Mascota>(`${this.myAppUrl}${this.myApiUrl}${id}`); }

  DeleteMascota (id: number): Observable<void> {return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`); }


  AddMascota (mascota: Mascota): Observable<Mascota> {return this.http.post<Mascota>(`${this.myAppUrl}${this.myApiUrl}`, mascota); }
  UpdateMascota (id: number, mascota: Mascota): Observable<void> {return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, mascota); }
}
