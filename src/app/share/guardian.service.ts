import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './../Servicios/login.service';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate{
  
  userActivity;
  userInactive: Subject<any> = new Subject();
  parar;

  constructor(private login: LoginService, private router: Router,
    private _snackBar: MatSnackBar) { 
      this.setTimeout();
    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(this.login.estaLogueado() == true){
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN);

      if(!helper.isTokenExpired(token)){

        console.log("esta en guardian ");

        
        this.parar = this.userInactive.subscribe(() => {
          console.log('Usuario inactivo x 10 minutos')
          this.login.cerrarSesion();
          this.router.navigate(['/ingresar']);
          this.openSnackBar("Supero el tiempo de inactividad", "Ups...");       
        });

        const decodeToken = helper.decodeToken(token);
        const url = state.url;
        const rol = decodeToken.authorities[0];
       
        if(url.includes('buscar') && rol === "Administrador"){
          return true;
        }else if(url.includes('usuario') && rol === "Administrador"){
          return true;
        }
        else if(url.includes('vehiculo') && rol === "Administrador"){
          return true;
        }
        else if(url.includes('conductor') && rol === "Conductor"){
          return true;
        }
        else{
          this.router.navigate(['/notAllowed']);
          return false;
        }
        
      }else{
        this.login.cerrarSesion();
        this.router.navigate(['/ingresar']);
        return false;
      }

    }else{
      this.router.navigate(['/notAllowed']);
      return false;
    }

    
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  setTimeout() {
    if(this.login.estaLogueado() == true){
      this.userActivity = setTimeout(() => this.userInactive.next(undefined), 600000);
    }
  }
  

}
