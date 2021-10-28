import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/Models/vehiculo';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { VehiculoService } from 'src/app/Servicios/vehiculo.service';
import { VehiculoComponent } from './../vehiculo.component';

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
    {value: 1, viewValue: 'Toyota'},
    {value: 2, viewValue: 'Chevrolet'},
    {value: 3, viewValue: 'Renault'},
    {value: 4, viewValue: 'Mazda'},
    {value: 5, viewValue: 'Mercedes'},
    {value: 6, viewValue: 'BMW'},
    {value: 7, viewValue: 'Alfa Romero'},
    {value: 8, viewValue: 'Audi'},
    {value: 9, viewValue: 'Ferrari'},
    {value: 10, viewValue: 'Peugeot'},
    {value: 11, viewValue: 'Porche'},
  ];
  modelos: Modelo[] = [

    {value: 1, viewValue: '2007'},
    {value: 2, viewValue: '2008'},
    {value: 3, viewValue: '2009'},
    {value: 4, viewValue: '2010'},
    {value: 5, viewValue: '2011'},
    {value: 6, viewValue: '2012'},
    {value: 7, viewValue: '2013'},
    {value: 8, viewValue: '2014'},
    {value: 9, viewValue: '2015'},
    {value: 10, viewValue: '2016'},
    {value: 11, viewValue: '2017'},
    {value: 12, viewValue: '2018'},
    {value: 13, viewValue: '2019'},
    {value: 14, viewValue: '2020'},
    {value: 15, viewValue: '2021'}
  ];
  tiposV: TipoVehi[] = [
    {value: 1, viewValue: 'Carro'},
    {value: 2, viewValue: 'Camioneta'},
    {value: 3, viewValue: 'Furgon'},
    {value: 4, viewValue: 'Campero'}
  ];

  form: FormGroup;


  constructor(private formBuilder:FormBuilder, private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar, private router: Router, private barra: ProgessBarService, 
    private vehiculoListar: VehiculoComponent) {
    this.buildForm();
  }

  ngOnInit(): void {
    
  }

  private buildForm(){
    this.barra.progressBarReactive.next(false);
    this.form = this.formBuilder.group({
      placa: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      placanum: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      modelo: ['',[Validators.required]],
      marca: ['',[Validators.required]],
      tipoVehiuclo: ['',[Validators.required]],
      capacidad: ['',[Validators.required, Validators.maxLength(6), Validators.minLength(4)]],
     
    });
    this.barra.progressBarReactive.next(true);
  }

  save(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const value = this.form.value;

      let placa = `${value.placa}-${value.placanum}`;

      let capacidad = `${value.capacidad}Kg`;

      let vehiculo: Vehiculo = new Vehiculo();
      vehiculo.placa = placa;
      vehiculo.modelo = value.modelo;
      vehiculo.marca = value.marca;
      vehiculo.tipoVehiuclo = value.tipoVehiuclo;
      vehiculo.capacidad = capacidad;

      this.vehiculoService.guardar(vehiculo).subscribe(data =>{
        this.openSnackBar("Vehiculo registrado", "Done..");
        this.vehiculoListar.llamarListar();
        this.router.navigate(['/vehiculo']);
      },error=>{
        console.log("Vehiculo no se guardo "+error)
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



}
