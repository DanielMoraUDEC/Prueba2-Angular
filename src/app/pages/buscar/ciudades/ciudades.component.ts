import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { DepartamentoService } from 'src/app/Servicios/departamento.service';
import { MatSort } from '@angular/material/sort';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';


@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  displayedColumns2: string[] = ['idCiudad', 'nombre'];

  listaCiudades: any[] = [];
  dataSource2 = new MatTableDataSource([]);

  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private departamentoService: DepartamentoService, 
    private route: ActivatedRoute, private barra: ProgessBarService) { }

  ngOnInit(): void {
    this.barra.progressBarReactive.next(false);
    this.listaCiudades = [];

    this.route.params.subscribe((params: Params) =>{
        let value = params['idDep']
        
        this.departamentoService.listarCiudades(value).subscribe(data =>{
          
            data.forEach(ciudad =>{
             this.listaCiudades.push({idCiudad: ciudad.idCiudad, nombre: ciudad.nombre});
            })
             this.dataSource2.data = this.listaCiudades;
             this.dataSource2.paginator = this.paginator2;
             this.dataSource2.sort = this.sort;
             this.barra.progressBarReactive.next(true);
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
