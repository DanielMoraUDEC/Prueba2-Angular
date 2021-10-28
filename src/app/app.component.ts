import { Component, OnInit } from '@angular/core';
import { ProgessBarService } from './Servicios/progess-bar.service';
import { LoginService } from './Servicios/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'prueba2Angular';

  constructor(private barra: ProgessBarService, public logout: LoginService,
    private _snackBar: MatSnackBar){
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
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

}
