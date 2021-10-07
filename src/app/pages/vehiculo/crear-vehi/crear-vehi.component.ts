import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Vehiculo } from 'src/app/Models/vehiculo';
import { VehiculoService } from 'src/app/Servicios/vehiculo.service';

interface Marca {
  value: number;
  viewValue: string;
}
interface Modelo {
  value: number;
  viewValue: string;
}
interface TipoVehi {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-crear-vehi',
  templateUrl: './crear-vehi.component.html',
  styleUrls: ['./crear-vehi.component.css']
})
export class CrearVehiComponent implements OnInit {

  marcas: Marca[] = [
    {value: 1, viewValue: 'Ferrary'},
    {value: 2, viewValue: 'Porshe'},
    {value: 3, viewValue: 'Chevrolet'}
  ];
  modelos: Modelo[] = [
    {value: 1, viewValue: '2001'},
    {value: 2, viewValue: '2002'},
    {value: 3, viewValue: '2003'}
  ];
  tiposV: TipoVehi[] = [
    {value: 1, viewValue: 'Carga'},
    {value: 2, viewValue: 'Publico'},
    {value: 3, viewValue: 'Campero'}
  ];

  form: FormGroup;


  constructor(private formBuilder:FormBuilder, private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      placa: ['',[Validators.required, Validators.maxLength(7), Validators.minLength(7)]],
      modelo: ['',[Validators.required]],
      marca: ['',[Validators.required]],
      tipoVehiuclo: ['',[Validators.required]],
      capacidad: ['',[Validators.required, Validators.maxLength(6), Validators.minLength(4)]],
     
    });

    /*this.form.valueChanges.
    pipe(
      debounceTime(500)
    ).
    subscribe(value =>{
      console.log(value);
    });*/

  }

  save(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const value = this.form.value;

      let vehiculo: Vehiculo = new Vehiculo();
      vehiculo.placa = value.placa;
      vehiculo.modelo = value.modelo;
      vehiculo.marca = value.marca;
      vehiculo.tipoVehiuclo = value.tipoVehiuclo;
      vehiculo.capacidad = value.capacidad;

      this.vehiculoService.guardar(vehiculo).subscribe(data =>{
        console.log("Se registro vehiculo")
        this.openSnackBar("Vehiculo registrado", "Done..");
        this.router.navigate(['/vehiculo']);
      },error=>{
        console.log("Vehiculo no se guardo "+error)
        if(error.error.status == 400){
          this.openSnackBar("Vehiculo ya registrado", "Error");
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



}
