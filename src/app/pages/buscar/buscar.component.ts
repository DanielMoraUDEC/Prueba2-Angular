import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartamentoService } from './../../Servicios/departamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from './../../Models/departamento';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  displayedColumns: string[] = ['idDepartamento', 'nombre', 'Ciudades'];
  
  //inyectar las dependencias
  constructor(private departamentoService: DepartamentoService,
    public route: ActivatedRoute) { }  

  //listaDepartamento: any[] = [];
  dataSource = new MatTableDataSource<Departamento>();
  carga: boolean = false;
  @ViewChild('paginator1') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {
    this.carga = true;
    //this.listaDepartamento = [];
 
    console.log("Se ejecuto automaticamente");
    this.departamentoService.listar().subscribe(data => {
      /*data.forEach(departamento =>{
        console.log("ID: " + departamento.idDepartamento + " Nombre: " + departamento.nombre);
        this.listaDepartamento.push({idDepartamento: departamento.idDepartamento, nombre: departamento.nombre});
        
      })*/
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.carga = false;
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
