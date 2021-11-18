import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from './../../Servicios/usuario.service';
import { Usuario } from './../../Models/usuario';
import { MatSort } from '@angular/material/sort';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EliminarComponent } from './eliminar/eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['idUsuario','nombre', 'apellido','tipoDocumento','documento','nick','celular', 'correo', 'cargo', 'acciones'];

  dataSource = new MatTableDataSource<Usuario>();

  rol: number = 4;
  page: number = 0;
  size: number = 5;
  length: number = 10;
  idConductor: number;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private conductor: UsuarioService, private barra: ProgessBarService
    ,public route: ActivatedRoute, private router: Router,public dialog: MatDialog, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){

    this.barra.progressBarReactive.next(false);

    this.conductor.listarConductores(this.rol, this.page, this.size).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.length = data.totalElements;
      this.barra.progressBarReactive.next(true);
    });
  }

  onPaginateChange(event: PageEvent){
    this.size = event.pageSize;
    this.page = event.pageIndex;

    this.llamarListar();
    
  }

  public llamarListar(){
    this.conductor.listarConductores(this.rol, this.page, this.size).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.length = data.totalElements;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscarUsuario(){
    this.conductor.listarConductoresPorId(this.idConductor).subscribe(data =>{
      console.log("entro");
      this.router.navigate(['/usuario/listar/',this.idConductor]);
    });
  }

  openDialog(idUsuario: number){

    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px'
      //data: 
    });

    dialogRef.afterClosed().subscribe(result => {
      let resultado = result;

      if(resultado){
        this.conductor.eliminar(idUsuario).subscribe(data =>{
          this.openSnackBar("Usuario Eliminado", "Done..");
          this.llamarListar();
        });
      }

    });


    }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

}
