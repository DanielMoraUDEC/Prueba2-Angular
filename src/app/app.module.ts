import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatiModuleModule } from './mati-module/mati-module.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { IngresarComponent } from './pages/ingresar/ingresar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CiudadesComponent } from './pages/buscar/ciudades/ciudades.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { CrearVehiComponent } from './pages/vehiculo/crear-vehi/crear-vehi.component';
import { EditVehiComponent } from './pages/vehiculo/edit-vehi/edit-vehi.component';
import { NoFoundComponent } from './share/no-found/no-found.component';
import { ErrorInterceptorService } from './share/error-interceptor.service';
import { ErrorComponent } from './share/error/error.component';
import { IndexComponent } from './pages/index/index.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioIdComponent } from './pages/usuario/usuario-id/usuario-id.component';
import { CrearUsuComponent } from './pages/usuario/crear-usu/crear-usu.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { AsociarComponent } from './pages/vehiculo/asociar/asociar.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EditarComponent } from './pages/usuario/editar/editar.component';
import { EliminarComponent } from './pages/usuario/eliminar/eliminar.component';
import { AsociadosComponent } from './pages/vehiculo/asociados/asociados.component';
import { NoAsociadosComponent } from './pages/vehiculo/no-asociados/no-asociados.component';


export function tokenGetter(){
  let tk = sessionStorage.getItem(environment.TOKEN);
  return tk != null ? tk:'';
}

@NgModule({
  declarations: [
    AppComponent,
    BuscarComponent,
    IngresarComponent,
    CiudadesComponent,
    VehiculoComponent,
    CrearVehiComponent,
    EditVehiComponent,
    NoFoundComponent,
    ErrorComponent,
    IndexComponent,
    NotAllowedComponent,
    UsuarioComponent,
    UsuarioIdComponent,
    CrearUsuComponent,
    ConductorComponent,
    AsociarComponent,
    EditarComponent,
    EliminarComponent,
    AsociadosComponent,
    NoAsociadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatiModuleModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ['159.223.107.103:8080'],
        disallowedRoutes: [`${environment.Host}/oauth/token`],
      },
      
    }),
  ],
  entryComponents:[
    AsociarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }, {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
