import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { catchError, retry, tap } from 'rxjs/operators';
import { ConstantPool } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error('Method not implemented.');
    return next.handle(req).pipe(retry(environment.REINTENTOS)).pipe
    (tap(event =>{
      if(event instanceof HttpResponse){
        if(event.body && event.body.error == true && event.body.errorMessage){
          throw new Error(event.body.errorMessage)
        }
      }
    })).pipe(catchError((err)=>{
      console.log(err);
      /**lista de errores */

      var mensaje = err.error.message;
      var nuevoMensa = mensaje.slice(4,mensaje.length);

      if(err.error.status == 400){
        this.openSnackBar(nuevoMensa, "!ups¡"); 
      }
      else if(err.error.status == 404){
        this.openSnackBar(nuevoMensa, "!ups¡");   
      }
      else if(err.error.status == 405){
        this.openSnackBar(nuevoMensa, "!ups¡");   
      }
      else if(err.error.status == 415){
        this.openSnackBar(nuevoMensa, "!ups¡"); 
      }
      else if(err.error.status == 500){
        this.router.navigate(['/error']);
        console.log(err.console.message);  
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
