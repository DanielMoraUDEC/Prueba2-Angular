import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../Models/usuario';
import { UsuarioCom } from '../Models/usuario-com';

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
    return this.http.get<UsuarioCom>(`${this.url}/listar/${id}`);
  }

  public guardar(usuario: Usuario){
    return this.http.post(`${this.url}/guardar`,usuario);
  }
  
  public editar(usuario: Usuario){
    return this.http.put(`${this.url}/editar`,usuario);
  }

  public eliminar(idUsuario: number){
    return this.http.delete(`${this.url}/eliminar/${idUsuario}`);
  }

  public conduAsociados(idVehiculo: number){
    return this.http.get<Usuario[]>(`${this.url}/listarConductorVehiculo/${idVehiculo}`);
  }

  public conduNoAsociados(idVehiculo: number){
    return this.http.get<Usuario[]>(`${this.url}/listarConductorNoVehiculo/${idVehiculo}`);
  }

}
