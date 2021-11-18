import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-asociados',
  templateUrl: './asociados.component.html',
  styleUrls: ['./asociados.component.css']
})
export class AsociadosComponent implements OnInit {
  displayedColumns: string[] = ['idUsuario','nombre', 'apellido','documento','acciones'];

  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator1') paginator: MatPaginator;

  constructor(private conductor: UsuarioService, private barra: ProgessBarService
    ,public route: ActivatedRoute, private router: Router,public dialog: MatDialog, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  this.listar();
  }


  listar(){

    this.barra.progressBarReactive.next(false);

    this.route.params.subscribe((params: Params) =>{
 
      let value = params['idVeh']
      this.conductor.conduAsociados(value).subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.barra.progressBarReactive.next(true);
      });
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

}
