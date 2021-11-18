import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehiculo } from './../Models/vehiculo';


@Injectable({
  providedIn: 'root'
})

export class VehiculoService {

  private url: string =  `${environment.Host}/vehiculos`;

  constructor(private http: HttpClient) { }

  public listar(page:number, size: number){
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
    //return this.http.get<Vehiculo[]>(this.url+"/pageable?page="+page+"&size="+size);
  }

  public guardar(vehiculo: Vehiculo){
    return this.http.post(`${this.url}/guardar`,vehiculo);
  }
  
  public editar(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`,vehiculo);
  }

  public asociar(idVehiculo: number, idUsuario: number){
    return this.http.post(`${this.url}/asociarcondcutor/${idUsuario}/${idVehiculo}`, null);
  }

}
