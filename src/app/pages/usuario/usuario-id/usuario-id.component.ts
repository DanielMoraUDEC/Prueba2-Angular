import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsuarioCom } from 'src/app/Models/usuario-com';
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

  idConductor: number;

  usuario : UsuarioCom = new UsuarioCom();

  ngOnInit(): void {
   this.listar();
  }

  listar(){


    this.barra.progressBarReactive.next(false);

    this.route.params.subscribe((params: Params) =>{
 
      let value = params['idCon']

      this.conductor.listarConductoresPorId(value).subscribe(data =>{
        this.usuario = data;
        this.barra.progressBarReactive.next(true);
      });
    
    });

    
  }

}
