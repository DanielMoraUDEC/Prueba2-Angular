import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CiudadesComponent } from './pages/buscar/ciudades/ciudades.component';
import { IngresarComponent } from './pages/ingresar/ingresar.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { CrearVehiComponent } from './pages/vehiculo/crear-vehi/crear-vehi.component';
import { EditVehiComponent } from './pages/vehiculo/edit-vehi/edit-vehi.component';
import { NoFoundComponent } from './share/no-found/no-found.component';
import { ErrorComponent } from './share/error/error.component';
import { IndexComponent } from './pages/index/index.component';



const routes: Routes = [
  {path: '', component:IndexComponent},
  {path: 'index', component:IndexComponent},
  {path: 'buscar', component:BuscarComponent, children:[
    {path: 'ciudades/:idDep', component:CiudadesComponent}
  ]},  
  {path: 'ingresar', component:IngresarComponent},
  {path: 'vehiculo', component:VehiculoComponent, children:[
    {path: 'crearVehi', component:CrearVehiComponent},
    {path: 'editVehi/:idVeh', component:EditVehiComponent}
  ]},
  {path: 'error', component:ErrorComponent},
  {path: '**', component:NoFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
