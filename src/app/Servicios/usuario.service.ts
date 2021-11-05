import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.Host}/usuarios`;
  constructor(private http: HttpClient) { }

  public listarConductores(rol: number, page: number, size: number ){
    return this.http.get<any>(`${this.url}/pageablePorRol/${rol}/${page}/${size}`);
  }

  public listarConductoresPorId(id: number ){
    return this.http.get<Usuario[]>(`${this.url}/listar/${id}`);
  }

}
