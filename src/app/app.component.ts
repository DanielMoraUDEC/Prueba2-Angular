import { Component, HostListener, OnInit } from '@angular/core';
import { ProgessBarService } from './Servicios/progess-bar.service';
import { LoginService } from './Servicios/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GuardianService } from './share/guardian.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'prueba2Angular';

  constructor(private barra: ProgessBarService, public logout: LoginService,
    private _snackBar: MatSnackBar, private inactividad: GuardianService){
  }

  public cargandoIndex: boolean = true;

  ngOnInit():void{
    this.barra.progressBarReactive.subscribe(data =>{
      this.cargandoIndex = data;
     //this.cargandoIndex = !this.cargandoIndex;
    });
  } 


  cerrarSesion(){
    this.logout.cerrarSesion();
    this.openSnackBar("Cerro sesión", "Done..");
    this.inactividad.parar.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  @HostListener('window:mousemove') refreshUserState() {
    if(this.logout.estaLogueado() == true){
      clearTimeout(this.inactividad.userActivity);
      this.inactividad.setTimeout();
    }
    
  }

}
