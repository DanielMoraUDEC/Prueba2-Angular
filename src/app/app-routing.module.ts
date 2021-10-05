import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CiudadesComponent } from './pages/buscar/ciudades/ciudades.component';
import { IngresarComponent } from './pages/ingresar/ingresar.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';

const routes: Routes = [
  {path: 'buscar', component:BuscarComponent, children:[
    {path: 'ciudades/:idDep', component:CiudadesComponent}
  ]
  },  
  {path: 'ingresar', component:IngresarComponent},
  {path: 'vehiculo', component:VehiculoComponent},
  {path: '**', component:BuscarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
