import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartamentoService } from './../../Servicios/departamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from './../../Models/departamento';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ProgessBarService } from './../../Servicios/progess-bar.service';



@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  displayedColumns: string[] = ['idDepartamento', 'nombre', 'Ciudades'];
  
  //inyectar las dependencias
  constructor(private departamentoService: DepartamentoService,
    public route: ActivatedRoute, private barra: ProgessBarService ) { }  

  //listaDepartamento: any[] = [];
  dataSource = new MatTableDataSource<Departamento>();

  @ViewChild('paginator1') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {

    //this.listaDepartamento = [];
 
    console.log("Se ejecuto automaticamente");
    this.barra.progressBarReactive.next(false);
    this.departamentoService.listar().subscribe(data => {
      /*data.forEach(departamento =>{
        console.log("ID: " + departamento.idDepartamento + " Nombre: " + departamento.nombre);
        this.listaDepartamento.push({idDepartamento: departamento.idDepartamento, nombre: departamento.nombre});
        
      })*/
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.barra.progressBarReactive.next(true);

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
