
import { Component,OnInit, ViewChild  } from '@angular/core';
import { Vehiculo } from './../../Models/vehiculo';
import { VehiculoData, VehiculoService } from './../../Servicios/vehiculo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string[] = ['placa', 'modelo', 'marca','tipoVehiuclo','capacidad', 'acciones'];

  dataSource1 : VehiculoData = null;
  dataSource = new MatTableDataSource<Vehiculo>();

  carga: boolean = false;


  //@ViewChild('paginator1') paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
 
  constructor(private vehiculoService: VehiculoService,
  private _snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit(): void {
    

    this.listar();

  }
  
  /*listar(){ 
    this.vehiculoService.listar(0,5).pipe(
      tap(vehiculos => console.log(vehiculos)),
      map((vehiculosData: VehiculoData) => this.dataSource = vehiculosData)
    ).subscribe();
  }
*/

  listar(){ 
    this.carga = true;
    this.vehiculoService.listar(0,5).pipe(
      tap(vehiculos => console.log(vehiculos)),
      map((vehiculosData: VehiculoData) => this.dataSource1 = vehiculosData)
    ).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.carga = false;
    });
  }


  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    this.carga = true;
    this.vehiculoService.listar(page, size).pipe(
      tap(vehiculos => console.log(vehiculos)),
      map((vehiculosData: VehiculoData) => this.dataSource1 = vehiculosData)
    ).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    

}
