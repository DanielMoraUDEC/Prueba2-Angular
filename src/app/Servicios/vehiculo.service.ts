import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehiculo } from './../Models/vehiculo';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface VehiculoData{
  content: Vehiculo[],
  pageable:{
    sort:{
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    }
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
     
   },
    totalPages: number,
    totalElements: number,
    last: boolean,
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    },
    first: boolean,
    numberOfElements: number,
    size: number,
    number: number,
    empty: boolean
 
 };

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {

  private url: string =  `${environment.Host}/vehiculos`;

  constructor(private http: HttpClient) { }

  public listar(page:number, size: number): Observable<VehiculoData>{
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));

    return this.http.get(this.url+"/pageable",{params}).pipe(
      map((vehiculoData: VehiculoData) => vehiculoData),
      catchError(err => throwError(err))
    );
    //return this.http.get<Vehiculo[]>(this.url+"/pageable?page="+page+"&size="+size);
  }

  public guardar(vehiculo: Vehiculo){
    return this.http.post(`${this.url}/guardar`,vehiculo);
  }
  public editar(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`,vehiculo);
  }
}
