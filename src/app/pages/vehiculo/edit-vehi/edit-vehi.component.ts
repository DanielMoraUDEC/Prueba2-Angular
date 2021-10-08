import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Vehiculo } from 'src/app/Models/vehiculo';
import { VehiculoData, VehiculoService } from 'src/app/Servicios/vehiculo.service';

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
  selector: 'app-edit-vehi',
  templateUrl: './edit-vehi.component.html',
  styleUrls: ['./edit-vehi.component.css']
})
export class EditVehiComponent implements OnInit {
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

  idVehiculo: number;
  placa: string;
  modelo: string;
  marca: string;
  tipoVehiuclo: string;
  capacidad: string;

  carga = false;
  dataSource1 : VehiculoData = null;

  constructor(private formBuilder:FormBuilder, private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    this.buildForm();
  }

  ngOnInit(): void {

    this.carga = true;

    this.route.params.subscribe((params: Params) =>{
      this.carga = true;
      let value = params['idVeh']
        
      this.vehiculoService.listar(0,100).subscribe(data =>{
        data.content.forEach(vehiculo =>{
          if(vehiculo.idVehiculo == value){
            this.idVehiculo = value;
            this.placa = vehiculo.placa;
            this.modelo = vehiculo.modelo;
            this.marca = vehiculo.marca;
            this.tipoVehiuclo = vehiculo.tipoVehiuclo;
            this.capacidad = vehiculo.capacidad;
          }
        });
        this.carga = false;
      });
      
        
      
    });

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
      vehiculo.idVehiculo = this.idVehiculo;
      vehiculo.placa = value.placa;
      vehiculo.modelo = value.modelo;
      vehiculo.marca = value.marca;
      vehiculo.tipoVehiuclo = value.tipoVehiuclo;
      vehiculo.capacidad = value.capacidad;

      this.vehiculoService.editar(vehiculo).subscribe(data =>{
        console.log("Se actualizo el vehiculo")
        this.openSnackBar("Vehiculo actualizado", "Done..");
        this.router.navigate(['/vehiculo']);
      },error=>{
        console.log("Vehiculo no se edito "+error)
        if(error.error.status == 400){
          this.openSnackBar("Vehiculo no...", "Error");
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
