import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { AsociarComponent } from './../asociar/asociar.component';
import { VehiculoService } from './../../../Servicios/vehiculo.service';
import { VehiculoComponent } from '../vehiculo.component';

@Component({
  selector: 'app-no-asociados',
  templateUrl: './no-asociados.component.html',
  styleUrls: ['./no-asociados.component.css']
})
export class NoAsociadosComponent implements OnInit {

  displayedColumns: string[] = ['idUsuario','nombre', 'apellido','documento','acciones'];

  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator1') paginator: MatPaginator;
  idVehiculo:number;

  constructor(private conductor: UsuarioService, private barra: ProgessBarService
    ,public route: ActivatedRoute, private router: Router,public dialog: MatDialog, 
    private _snackBar: MatSnackBar, private vehiculoService: VehiculoService, 
    private vehiculo: VehiculoComponent) { }

  ngOnInit(): void {
    this.listar();
  }


  listar(){

    this.barra.progressBarReactive.next(false);

    this.route.params.subscribe((params: Params) =>{
 
      this.idVehiculo = params['idVeh']
      this.conductor.conduNoAsociados(this.idVehiculo).subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.barra.progressBarReactive.next(true);
      });
    });
    
  }


  public llamarListar(){
    this.conductor.conduNoAsociados(this.idVehiculo).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  openDialog(idUsuario: number, usuario:string){

    const dialogRef = this.dialog.open(AsociarComponent, {
      width: '260px',
      data: {usuario:usuario, vehiculo:this.idVehiculo}
    });

    dialogRef.afterClosed().subscribe(result => {
      let resultado = result;

      if(resultado){
        this.vehiculoService.asociar(this.idVehiculo,idUsuario).subscribe(data =>{
          this.openSnackBar("Usuario Asociado", "Done..");
          this.llamarListar();
        });
      }

    });


    }

}
