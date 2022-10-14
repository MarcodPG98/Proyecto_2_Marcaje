import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { HistEmployee } from '../models/histEmployee';
import { Employee } from '../models/employee';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  // guardamos las direcciones del servidor
  private apiURL = "http://127.0.0.1:8000/api";
  private authURL = "http://127.0.0.1:8000/api/auth";

  constructor(
    private token : TokenService,
    private httpClient: HttpClient
  ) { }

  /*
    Método para obtener los datos del usuario
  */
  profile(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.authURL + '/user-profile', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()),
    })
    .pipe(
      catchError(this.errorHandler)
    )
    
  }

  /*
  getAll(): Observable<HistEmployee[]> {
    return this.httpClient.get<HistEmployee[]>(this.apiURL + '/empleado', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  */

  /*
    Método para devolver los datos del usuario validando
    por medio del id y fecha del día
  */
  historialUsuario(id: number, date: String): Observable<HistEmployee[]> {
    return this.httpClient.get<HistEmployee[]>(this.apiURL + '/histEmployee/'+id+','+date, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()),
    })
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /*
    Método para actualizar hora de salida del usuario
  */
  validarEntrada(id: number): Observable<HistEmployee[]> {
    return this.httpClient.get<HistEmployee[]>(this.apiURL + '/histEmployee/'+id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()),
    })
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /*
    Método para crear un nuevo registro
  */
  create(Employee: Employee): Observable<Employee> {
    return this.httpClient.post<HistEmployee>(this.apiURL + '/histEmployee', JSON.stringify(Employee),
    {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get())
      .set('Content-Type', 'application/json'),
    })
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /*
    Método para regresar posibles errores
  */
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
