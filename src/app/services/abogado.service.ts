import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/ApiService';
import { IAbogado } from '../Interfaces/IAbogado';
@Injectable({
  providedIn: 'root'
})
export class AbogadoService {

  private apiUrl = 'https://localhost:7150/api/Estudio/'; // cambia a tu URL real


  constructor(private http: HttpClient,
    private apiService: ApiService) {}
  /*Buscar CUN Individual */
  getAbogados() {
    const endpoint = `${this.apiUrl}Listar`;
    return this.apiService.get<IAbogado[]>(endpoint);
  }

}
