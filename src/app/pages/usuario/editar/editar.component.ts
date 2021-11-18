import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudad } from 'src/app/Models/ciudad';
import { Departamento } from 'src/app/Models/departamento';
import { Usuario } from 'src/app/Models/usuario';
import { DepartamentoService } from 'src/app/Servicios/departamento.service';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { UsuarioComponent } from '../usuario.component';

interface tipoDoc {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  form: FormGroup;

  tipoDoc: tipoDoc[] = [

    {value: 1, viewValue: 'Cédula'},
    {value: 2, viewValue: 'T.I.'},
    {value: 3, viewValue: 'Cédula Extranjera'},
    {value: 4, viewValue: 'Pasaporte'},

  ];

  listaDep: Departamento[] = [];
  listaCiu: Ciudad[] = [];

  documento: string;
  nombre: string;
  apellido: string;
  nick: string;
  direccion: string;
  celular: string;
  celularAux: string;
  correo: string;
  departamento: number;
  tipoDocumento: number;    
  rol:string;
  ciudad: number;
  clave: string;

  value: number;
   
  
  constructor(private formBuilder:FormBuilder, private usuario:UsuarioService, 
    private _snackBar: MatSnackBar, private router: Router, private barra: ProgessBarService,
    private route: ActivatedRoute,private usuarioListar: UsuarioComponent,
     private departamentos: DepartamentoService) {
    
   }

  ngOnInit(): void {
    this.buildForm();

    this.listarDepartamentos();

    this.barra.progressBarReactive.next(false);

    this.route.params.subscribe((params: Params) =>{
 
     this.value = params['idCon']
        
      this.usuario.listarConductores(4,this.usuarioListar.page,this.usuarioListar.size).subscribe(data =>{
        data.content.forEach(usuario =>{
          if(usuario.idUsuario == this.value){
            this.documento = usuario.documento;
            this.nombre = usuario.nombre;
            this.apellido = usuario.apellido;
            this.nick = usuario.nick;
            this.direccion = usuario.direccion;
            this.celular = usuario.celular;
            this.celularAux = usuario.celularAux;
            this.correo = usuario.correo;
            this.tipoDocumento = usuario.tipoDocumento.idTipoDocumento;
            this.departamento = usuario.ciudad.departamento.idDepartamento;
            this.ciudad = usuario.ciudad.idCiudad;
            this.clave = usuario.clave;

            this.listarCiudades(this.departamento);
            console.log("entro bien")
          }
        });
        this.barra.progressBarReactive.next(true);
      });
        
      
    });

    
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

    this.form = this.formBuilder.group({
      documento: ['',[Validators.required, Validators.maxLength(11), Validators.minLength(7)]],
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      nick: ['',[Validators.required]],
      clave: ['',[]],
      direccion: ['',[Validators.required]],
      celular: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      celularAux: ['',[Validators.maxLength(10), Validators.minLength(10)]],
      correo: ['',[Validators.required, Validators.email]],
      tipoDocumento: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      ciudad: ['',[Validators.required]],
    });

  }

  save(event: Event){

    event.preventDefault();

    if(this.form.valid){

      console.log("entro");
      const value = this.form.value;

      let usuario: Usuario = new Usuario();

      usuario.idUsuario = this.value;
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


     this.usuario.editar(usuario).subscribe(data =>{
        this.openSnackBar("Usuario Actualizado", "Done..");
        this.usuarioListar.llamarListar();
        this.router.navigate(['/usuario']);
      },error=>{
        console.log("Usuario No se Actualizo "+error)
        if(error.error.status == 400){
        }
        
      });

    }else{
      console.log("entro2");
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

