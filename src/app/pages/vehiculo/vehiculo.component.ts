
import { Component,OnInit, ViewChild  } from '@angular/core';
import { Vehiculo } from './../../Models/vehiculo';
import { VehiculoService } from './../../Servicios/vehiculo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string[] = ['idVehiculo','placa', 'modelo', 'marca','tipoVehiuclo','capacidad', 'acciones'];

  dataSource = new MatTableDataSource<Vehiculo>();
  carga: boolean = false;
  @ViewChild('paginator1') paginator: MatPaginator;

  constructor(private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit(): void {
    

    this.onPaginateChange();

  }
  

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;
    

    page = page +1;
    this.carga = true;
    //this.listaDepartamento = [];
 
    console.log("Se ejecuto automaticamente");
    this.vehiculoService.listar(page, size).subscribe(data => {
      /*data.forEach(departamento =>{
        console.log("ID: " + departamento.idDepartamento + " Nombre: " + departamento.nombre);
        this.listaDepartamento.push({idDepartamento: departamento.idDepartamento, nombre: departamento.nombre});
        
      })*/
      console.log(data)
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.carga = false;
    });
  }

  public insertar(){
    let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.placa = "dan-129";
    vehiculo.modelo = "2022";
    vehiculo.marca = "Porsche";
    vehiculo.tipoVehiuclo = "Deportivo";
    vehiculo.capacidad = "220kg";



    this.vehiculoService.guardar(vehiculo).subscribe(data =>{
      console.log("Se registro vehiculo")
    },error=>{
      console.log("Vehiculo no se guardo "+error)
      if(error.error.status == 400){
        this.openSnackBar("Vehiculo ya registrado", "Error");
      }
      
    })
  }

  public editar() {
    let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.idVehiculo = 7;
    vehiculo.placa = "dan-666";
    vehiculo.modelo = "2022";
    vehiculo.marca = "Porsche";
    vehiculo.tipoVehiuclo = "Deportivo";
    vehiculo.capacidad = "150kg";

    this.vehiculoService.editar(vehiculo).subscribe(dat =>{
      console.log("Se actualizo el vehiculo")
    },error=>{
      console.log("Vehiculo no se edito "+error)
      if(error.error.status == 400){
        this.openSnackBar("Vehiculo ya registrado", "Error");
      }
    })
  }
  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
    

}
