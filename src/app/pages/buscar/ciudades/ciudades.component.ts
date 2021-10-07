import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { DepartamentoService } from 'src/app/Servicios/departamento.service';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  displayedColumns2: string[] = ['idCiudad', 'nombre'];

  listaCiudades: any[] = [];
  dataSource2 = new MatTableDataSource([]);
  carga: boolean = false;

  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private departamentoService: DepartamentoService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.carga = true;
    this.listaCiudades = [];

    this.route.params.subscribe((params: Params) =>{
      this.carga = true;
        let value = params['idDep']
        
        this.departamentoService.listarCiudades(value).subscribe(data =>{
          console.log("Ciudades: del id "+ value);
          console.log("");
            data.forEach(ciudad =>{
             console.log("ID: " +ciudad.idCiudad  + " Nombre: " + ciudad.nombre );
             this.listaCiudades.push({idCiudad: ciudad.idCiudad, nombre: ciudad.nombre});
            })
             this.dataSource2.data = this.listaCiudades;
             this.dataSource2.paginator = this.paginator2;
             this.dataSource2.sort = this.sort;
             this.carga = false;
          });

    });

    

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }




  

}
