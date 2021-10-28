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
    NotAllowedComponent
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
