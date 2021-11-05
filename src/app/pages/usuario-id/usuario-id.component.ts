import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-usuario-id',
  templateUrl: './usuario-id.component.html',
  styleUrls: ['./usuario-id.component.css']
})
export class UsuarioIdComponent implements OnInit {

  constructor(private conductor: UsuarioService, private barra: ProgessBarService
    ,public route: ActivatedRoute) { }

  idConductor = 4;
  displayedColumns: string[] = ['nombre', 'apellido','tipoDocumento','documento','nick','celular', 'celularAux', 'correo', 'cargo', 'ciudad','direccion', 'acciones'];

  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
   this.listar();
  }

  listar(){

    this.barra.progressBarReactive.next(false);

    this.conductor.listarConductoresPorId(this.idConductor).subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.barra.progressBarReactive.next(true);
    });
  }

}
