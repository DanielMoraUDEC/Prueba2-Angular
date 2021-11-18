import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.Host}/oauth/token`;
  private url2: string = `${environment.Host}/cerrarSesion/anular`;

  constructor(private http: HttpClient, private router: Router) { }

  public login(usuario: User){
    const body = `grant_type=password&username=${encodeURIComponent(usuario.user)}&password=${encodeURIComponent(usuario.password)}`;
    
    return this.http.post<any>(`${this.url}`, body, {
      headers:new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=Utf-8').
      set('Authorization', 'Basic ' + btoa(`${environment.TOKEN_AUTH_USERNAME}:${environment.TOKEN_AUTH_PASSWORD}`))   
    });
  }

  public cerrarSesion(){
    const tk = sessionStorage.getItem(environment.TOKEN);
    this.http.get(`${this.url2}/${tk}`).subscribe(data =>{
      sessionStorage.clear();
      this.router.navigate(['/index']);
    })
  }

  public estaLogueado(): boolean{
    const tk = sessionStorage.getItem(environment.TOKEN);
    return tk != null;
  }

  public obtenerRol(): string{
    if(this.estaLogueado() == true){
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN);
      const decodeToken = helper.decodeToken(token);
      const rol = decodeToken.authorities[0];
      return rol;
    }else{
      return null;
    }
    
  }
}
