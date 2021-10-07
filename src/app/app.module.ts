import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatiModuleModule } from './mati-module/mati-module.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { IngresarComponent } from './pages/ingresar/ingresar.component';
import { HttpClientModule } from '@angular/common/http';
import { CiudadesComponent } from './pages/buscar/ciudades/ciudades.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { CrearVehiComponent } from './pages/vehiculo/crear-vehi/crear-vehi.component';
import { EditVehiComponent } from './pages/vehiculo/edit-vehi/edit-vehi.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarComponent,
    IngresarComponent,
    CiudadesComponent,
    VehiculoComponent,
    CrearVehiComponent,
    EditVehiComponent
  ],
  imports: [

  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatiModuleModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
