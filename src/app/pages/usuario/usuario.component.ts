import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from './../../Servicios/usuario.service';
import { Usuario } from './../../Models/usuario';
import { MatSort } from '@angular/material/sort';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido','tipoDocumento','documento','nick','celular', 'celularAux', 'correo', 'cargo', 'ciudad','direccion', 'acciones'];

  dataSource = new MatTableDataSource<Usuario>();

  rol: number = 4;
  page: number = 0;
  size: number = 5;
  length: number = 10;
  idConductor: number;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private conductor: UsuarioService, private barra: ProgessBarService
    ,public route: ActivatedRoute) { }

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
