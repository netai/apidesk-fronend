import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../../app.config';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {

  constructor(
    private _http: HttpClient,
    private _es: ErrorService
  ) { }

  private _getHeader(params: any): { headers: any, params: any } {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params
    };
    return httpOptions;
  }

  public getData(url: string, params: any = null): Observable<any> {
    return this._http.get(AppConfig.API_BASE_URL + url, this._getHeader(params))
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError((serverError: Response) => {
          this._errorHandler(serverError)
          return throwError(serverError)
        })
      );
  }

  public postData(url: string, postData: any): Observable<any> {
    return this._http.post(AppConfig.API_BASE_URL + url, postData, this._getHeader(null))
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError((serverError: Response) => {
          this._errorHandler(serverError)
          return throwError(serverError)
        })
      );
  }

  public deleteData(url: string): Observable<any> {
    return this._http.delete(AppConfig.API_BASE_URL + url, this._getHeader(null))
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError((serverError: Response) => {
          this._errorHandler(serverError)
          return throwError(serverError)
        })
      );
  }

  public putData(url: string, postData: any): Observable<any> {
    return this._http.put(AppConfig.API_BASE_URL + url, postData, this._getHeader(null))
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError((serverError: Response) => {
          this._errorHandler(serverError)
          return throwError(serverError)
        })
      );
  }

  private _errorHandler(error: any): void {
    this._es.errorHandler(error);
  }
}