import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { catchError, retry, tap } from 'rxjs/operators';
import { ConstantPool } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResultJson, TestService } from './../Servicios/errores.service';
import { ProgessBarService } from '../Servicios/progess-bar.service';
import { Errores } from '../Models/errores';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private _snackBar: MatSnackBar, private router: Router, private errorService: TestService ,
    private barra: ProgessBarService) { }

    resultJSON: ResultJson;
    ResultJsonString : any;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error('Method not implemented.');
    return next.handle(req).pipe(retry(environment.REINTENTOS)).pipe
    (tap(event =>{
      if(event instanceof HttpResponse){
        if(event.body && event.body.error == true && event.body.errorMessage){
          throw new Error(event.body.errorMessage)
        }
      }
    })).pipe(catchError((error)=>{
      console.log(error);
      /**lista de errores */

      let mensaje = error.error.message;
      let nuevoMensa = mensaje.slice(4,mensaje.length);

      this.barra.progressBarReactive.next(true);

      if(error.status == 400){
        this.openSnackBar(nuevoMensa, "!ups¡"); 
        this.barra.progressBarReactive.next(true);
      }
      else if(error.status == 401){
        this.router.navigate(['/notAllowed']);
        console.log(error.console.message);  
        this.barra.progressBarReactive.next(true);
      }
      else if(error.status == 404){
        this.openSnackBar(nuevoMensa, "!ups¡");  
        this.barra.progressBarReactive.next(true); 
      }
      else if(error.status == 405){
        this.openSnackBar(nuevoMensa, "!ups¡"); 
        this.barra.progressBarReactive.next(true);  
      }
      else if(error.status == 415){
        this.openSnackBar(nuevoMensa, "!ups¡"); 
        this.barra.progressBarReactive.next(true);
      }
      else if(error.status == 500){
        this.router.navigate(['/error']);
        console.log(error.console.message);  
        this.barra.progressBarReactive.next(true);
      }

      return EMPTY;
    }))
  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}
