import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Departamento } from './../Models/departamento';
import { Ciudad } from './../Models/ciudad';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {

  private url: string =  environment.Host+'/departamentos';
  private url2: string = environment.Host+'/departamentos/ciudad';

  constructor(private http: HttpClient) { }

  public listar(){
    return this.http.get<Departamento[]>(this.url+"/listar");
  }
  public listarCiudades(idDepartamento){
    return this.http.get<Ciudad[]>(this.url2+"/listarPorDepartamnto/"+idDepartamento);
  }

}
