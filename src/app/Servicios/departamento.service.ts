import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Departamento } from './../Models/departamento';
import { Ciudad } from './../Models/ciudad';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {

  private url: string =  environment.Host+'/departamentos';
  private url2: string = environment.Host+'/departamentos/ciudad';

  constructor(private http: HttpClient) { }

  /*
  public listar(){
    return this.http.get<Departamento[]>(this.url+"/listar",{
      headers: new HttpHeaders().set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibWl0b3Jlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjM0NjU4NDI2LCJhdXRob3JpdGllcyI6WyJBZG1pbmlzdHJhZG9yIl0sImp0aSI6IjQ4OTUzNWI2LTA0YzktNDE2OS1iYzQzLWJlMzA4YmU2N2UzOCIsImNsaWVudF9pZCI6Im1pdG9tZWRpYXBwIn0.IxmoNdqDialAv8JsueA-OmcawlFcIADmtQBUS1gkw88')
    } 
    );
    
  }
  */
  public listar(){
    return this.http.get<Departamento[]>(this.url+"/listar");
  }
  public listarCiudades(idDepartamento: number){
    return this.http.get<Ciudad[]>(this.url2+"/listarPorDepartamnto/"+idDepartamento);
  }

}
