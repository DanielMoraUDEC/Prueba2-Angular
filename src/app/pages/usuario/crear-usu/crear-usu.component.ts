import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { UsuarioComponent } from '../usuario.component';
import { DepartamentoService } from './../../../Servicios/departamento.service';
import { Ciudad } from './../../../Models/ciudad';
import { Departamento } from 'src/app/Models/departamento';

interface tipoDoc {
  value: number;
  viewValue: string;
}

interface departamento {
  value: number;
  viewValue: string;
}

interface ciudad {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-crear-usu',
  templateUrl: './crear-usu.component.html',
  styleUrls: ['./crear-usu.component.css']
})
export class CrearUsuComponent implements OnInit {

  form: FormGroup;

  tipoDoc: tipoDoc[] = [

    {value: 1, viewValue: 'Cédula'},
    {value: 2, viewValue: 'T.I.'},
    {value: 3, viewValue: 'Cédula Extranjera'},
    {value: 4, viewValue: 'Pasaporte'},

  ];

  listaDep: Departamento[] = [];
  listaCiu: Ciudad[] = [];
  
  constructor(private formBuilder:FormBuilder, private usuario:UsuarioService, 
    private _snackBar: MatSnackBar, private router: Router, private barra: ProgessBarService,
    private usuarioListar: UsuarioComponent, private departamentos: DepartamentoService) {
      this.buildForm();
     }

  ngOnInit(): void {
    
    this.listarDepartamentos();
    
  }

  listarDepartamentos(){
    this.listaDep = [];

    this.departamentos.listar().subscribe(data =>{
      data.forEach(element => {
        this.listaDep.push({idDepartamento: element.idDepartamento, nombre: element.nombre});
      });
    });
  }

  listarCiudades(idDepartamento: number){
    this.listaCiu = [];
    this.departamentos.listarCiudades(idDepartamento).subscribe(data =>{
      data.forEach(ciudad =>{
        this.listaCiu.push({idCiudad: ciudad.idCiudad, nombre: ciudad.nombre});
       })
    });
  }

  private buildForm(){
    this.barra.progressBarReactive.next(false);
    this.form = this.formBuilder.group({
      documento: ['',[Validators.required, Validators.maxLength(11), Validators.minLength(7)]],
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      nick: ['',[Validators.required]],
      clave: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      celular: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      celularAux: ['',[Validators.maxLength(10), Validators.minLength(10)]],
      correo: ['',[Validators.required, Validators.email]],
      tipoDocumento: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      ciudad: ['',[Validators.required]],
    });
    this.barra.progressBarReactive.next(true);
  }

  save(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const value = this.form.value;

      let usuario: Usuario = new Usuario();

      usuario.documento = value.documento;
      usuario.nombre = value.nombre;
      usuario.apellido = value.apellido;
      usuario.nick = value.nick;
      usuario.clave = value.clave;
      usuario.direccion = value.direccion;
      usuario.celular = value.celular;
      usuario.celularAux = value.celularAux;
      usuario.correo = value.correo;

      usuario.tipoDocumento = {
        idTipoDocumento: value.tipoDocumento
      };
      usuario.ciudad = {
        idCiudad: value.ciudad
      };
      usuario.rol = {
        idRol: 4
      };

      console.log(usuario);

     this.usuario.guardar(usuario).subscribe(data =>{
        this.openSnackBar("Usuario Registrado", "Done..");
        this.usuarioListar.llamarListar();
        this.router.navigate(['/usuario']);
      },error=>{
        console.log("Usuario No se guardo "+error)
        if(error.error.status == 400){
        }
        
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

  public inputValidatorDoc(event: any): void{
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)){
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }


}
