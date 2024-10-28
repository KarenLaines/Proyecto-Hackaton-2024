import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { ApuntesComponent } from './components/apuntes/apuntes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PreguntasComponent,
    RespuestasComponent,
    ApuntesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
