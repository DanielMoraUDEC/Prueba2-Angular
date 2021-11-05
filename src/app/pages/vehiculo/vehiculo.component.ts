
import { Component,OnInit, ViewChild  } from '@angular/core';
import { Vehiculo } from './../../Models/vehiculo';
import { VehiculoService } from './../../Servicios/vehiculo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string[] = ['placa', 'modelo', 'marca','tipoVehiuclo','capacidad', 'acciones'];

  dataSource = new MatTableDataSource<Vehiculo>();



  //@ViewChild('paginator1') paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  pageSize: number = 5;
  length: number = 10; 
  pageIndex = 0;
 
  constructor(private vehiculoService: VehiculoService,
  private _snackBar: MatSnackBar, public route: ActivatedRoute, private barra: ProgessBarService) { }

  ngOnInit(): void {
  
    this.listar();

  }
  
  listar(){ 
    this.barra.progressBarReactive.next(false);

    this.vehiculoService.listar(0,5).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.barra.progressBarReactive.next(true); 
      this.length = data.totalElements;
    });
  }


  onPaginateChange(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.llamarListar();
    
  }

  public llamarListar(){
    this.vehiculoService.listar(this.pageIndex, this.pageSize).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
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
