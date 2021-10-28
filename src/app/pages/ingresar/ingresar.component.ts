import { Component, OnInit } from '@angular/core';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { environment } from 'src/environments/environment';
import { LoginService } from './../../Servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from './../../Models/user';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  form: FormGroup;
  
  constructor(private barra: ProgessBarService, private loginService: LoginService,
    private formBuilder:FormBuilder, private _snackBar: MatSnackBar,
    private router: Router) {
      this.buildForm(); 
    }

  ngOnInit(): void {


  }

  private buildForm(){
    this.barra.progressBarReactive.next(false);
    this.form = this.formBuilder.group({
      usuario: ['',[Validators.required]],
      contrasena: ['',[Validators.required]],
    });
    this.barra.progressBarReactive.next(true);
  }

  save(event: Event){
    event.preventDefault();

    if(this.form.valid){
      const value = this.form.value;

      let usuario: User = new User();
      usuario.user = value.usuario;
      usuario.password = value.contrasena;

      this.loginService.login(usuario).subscribe(data =>{
        console.log(data);
        sessionStorage.setItem(environment.TOKEN, data.access_token);
        console.log("Ingreso bien")
        this.openSnackBar("Ingreso bien", "Done..");
        this.router.navigate(['/index']);

      },error=>{
        this.openSnackBar("Usuario o contraseña incorrecta", "upss..");
      });

    }else{
      this.form.markAllAsTouched();
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

}
