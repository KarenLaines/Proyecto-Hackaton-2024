import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apuntes',
  templateUrl: './apuntes.component.html',
  styleUrls: ['./apuntes.component.css']
})
export class ApuntesComponent {
  archivo!: File;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  subirArchivo() {
    const formData = new FormData();
    formData.append('apunte', this.archivo);

    this.http.post('/api/apuntes', formData).subscribe(response => {
      console.log('Archivo subido exitosamente', response);
    });
  }
}
