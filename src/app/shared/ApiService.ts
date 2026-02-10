import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStore } from './TokenStore';


/**
 *  Clase para realizar todas las peticiones a la API, incluye todos los verbos y los headers para autorizaciones
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private tokenStore = inject(TokenStore);

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, data: any, httParams?: HttpParams): Observable<HttpResponse<T>> {
    const httpHeaders = this.getHeaders();
    return this.http.post<T>(url, data, {
      headers: httpHeaders,
      observe: 'response',
      params: httParams,
    });
  }

  put<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders = this.getHeaders();
    return this.http.put<T>(url, data, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  delete<T>(url: string, params?: HttpParams): Observable<HttpResponse<T>> {
    const httpHeaders = this.getHeaders();
    return this.http.delete<T>(url, {
      headers: httpHeaders,
      observe: 'response',
      params,
    });
  }

  getFiles(url: string, httParams?: HttpParams): Observable<HttpResponse<Blob>> {
    const httpHeaders = this.getHeaders();
    return this.http.get(url, {
      headers: httpHeaders,
      params: httParams,
      responseType: 'blob',
      observe: 'response',
    });
  }

  postFiles(url: string, data: any, httParams?: HttpParams): Observable<HttpResponse<Blob>> {
    const httpHeaders = this.getHeaders();
    return this.http.post(url, data, {
      headers: httpHeaders,
      params: httParams,
      responseType: 'blob',
      observe: 'response',
    });
  }

  /**
   * Headers para la petición
   * @returns
   */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.tokenStore.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
