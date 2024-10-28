import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntas: any[] = [];
  nuevoTitulo: string = '';
  nuevoContenido: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPreguntas();
  }

  getPreguntas() {
    this.http.get('/api/preguntas').subscribe((data: any) => {
      this.preguntas = data;
    });
  }

  agregarPregunta() {
    const nuevaPregunta = { titulo: this.nuevoTitulo, contenido: this.nuevoContenido };
    this.http.post('/api/preguntas', nuevaPregunta).subscribe(() => {
      this.getPreguntas();
      this.nuevoTitulo = '';
      this.nuevoContenido = '';
    });
  }
}
