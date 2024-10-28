import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {
  respuestas: any[] = [];
  nuevoContenido: string = '';
  preguntaId: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.preguntaId = +this.route.snapshot.paramMap.get('id')!;
    this.getRespuestas();
  }

  getRespuestas() {
    this.http.get(`/api/preguntas/${this.preguntaId}/respuestas`).subscribe((data: any) => {
      this.respuestas = data;
    });
  }

  agregarRespuesta() {
    const nuevaRespuesta = { contenido: this.nuevoContenido };
    this.http.post(`/api/preguntas/${this.preguntaId}/respuestas`, nuevaRespuesta).subscribe(() => {
      this.getRespuestas();
      this.nuevoContenido = '';
    });
  }
}
