import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { HistEmployee } from '../models/histEmployee';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiURL = "http://127.0.0.1:8000/api";
  private authURL = "http://127.0.0.1:8000/api/auth";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  }

  constructor(
    private token : TokenService,
    private httpClient: HttpClient
  ) { }

  profile(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.authURL + '/user-profile', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()),
    })
    .pipe(
      catchError(this.errorHandler)
    )
    
  }

  getAll(): Observable<HistEmployee[]> {
    return this.httpClient.get<HistEmployee[]>(this.apiURL + '/empleado', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  historialUsuario(id: number, date: String): Observable<HistEmployee[]> {
    return this.httpClient.get<HistEmployee[]>(this.apiURL + '/histEmployee/'+id+','+date, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()),
    })
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(histEmployee: HistEmployee): Observable<HistEmployee> {
    return this.httpClient.post<HistEmployee>(this.apiURL + '/clients', JSON.stringify(histEmployee),
    {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()),
    })
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
