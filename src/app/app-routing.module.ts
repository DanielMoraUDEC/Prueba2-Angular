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
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { GuardianService } from './share/guardian.service';
import { UsuarioIdComponent } from './pages/usuario-id/usuario-id.component';
const routes: Routes = [
  {path: '', component:IndexComponent},
  {path: 'index', component:IndexComponent},
  {path: 'buscar', component:BuscarComponent, canActivate: [GuardianService], children:[
    {path: 'ciudades/:idDep', component:CiudadesComponent, canActivate: [GuardianService]}
  ]},  
  {path: 'ingresar', component:IngresarComponent},
  {path: 'vehiculo', component:VehiculoComponent, canActivate: [GuardianService], children:[
    {path: 'crearVehi', component:CrearVehiComponent, canActivate: [GuardianService]},
    {path: 'editVehi/:idVeh', component:EditVehiComponent, canActivate: [GuardianService]}
  ]},
  {path: 'usuario', component:UsuarioComponent, canActivate: [GuardianService], children:[
    {path: 'listar/:Id', component:UsuarioIdComponent, canActivate: [GuardianService]},
  ]},
  {path: 'error', component:ErrorComponent},
  {path: 'notAllowed', component:NotAllowedComponent},
  {path: '**', component:NoFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
