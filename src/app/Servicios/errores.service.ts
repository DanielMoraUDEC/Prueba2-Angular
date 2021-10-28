import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Errores } from '../Models/errores';
import { Router } from '@angular/router';

export interface ResultJson{

}


@Injectable({
  providedIn: 'root'
})

export class TestService {

  constructor(private readonly http: HttpClient, private router: Router ){}

  urlEncoded = '../../assets/errores.json';

 

  getText(){
    return this.http.get(this.urlEncoded, {responseType: 'text'});
  }



  postText(error: Errores){
    return this.http.post(this.urlEncoded, error, {responseType: 'text'});
  }


}

