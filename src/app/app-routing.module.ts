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
import { UsuarioIdComponent } from './pages/usuario/usuario-id/usuario-id.component';
import { CrearUsuComponent } from './pages/usuario/crear-usu/crear-usu.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { EditarComponent } from './pages/usuario/editar/editar.component';
import { AsociadosComponent } from './pages/vehiculo/asociados/asociados.component';
import { NoAsociadosComponent } from './pages/vehiculo/no-asociados/no-asociados.component';


const routes: Routes = [
  {path: '', component:IndexComponent},
  {path: 'index', component:IndexComponent},
  {path: 'buscar', component:BuscarComponent, canActivate: [GuardianService], children:[
    {path: 'ciudades/:idDep', component:CiudadesComponent, canActivate: [GuardianService]}
  ]},  
  {path: 'ingresar', component:IngresarComponent},
  {path: 'vehiculo', component:VehiculoComponent, canActivate: [GuardianService], children:[
    {path: 'crearVehi', component:CrearVehiComponent, canActivate: [GuardianService]},
    {path: 'asociados/:idVeh', component:AsociadosComponent, canActivate: [GuardianService]},
    {path: 'noAsociados/:idVeh', component:NoAsociadosComponent, canActivate: [GuardianService]},
    {path: 'editVehi/:idVeh', component:EditVehiComponent, canActivate: [GuardianService]}
  ]},
  {path: 'usuario', component:UsuarioComponent, canActivate: [GuardianService], children:[
    {path: 'listar/:idCon', component:UsuarioIdComponent, canActivate: [GuardianService]},
    {path: 'editar/:idCon', component:EditarComponent, canActivate: [GuardianService]},
    {path: 'crearUsuario', component:CrearUsuComponent, canActivate: [GuardianService]}
  ]},
  {path: 'conductor', component:ConductorComponent, canActivate: [GuardianService]},
  {path: 'error', component:ErrorComponent},
  {path: 'notAllowed', component:NotAllowedComponent},
  {path: '**', component:NoFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
