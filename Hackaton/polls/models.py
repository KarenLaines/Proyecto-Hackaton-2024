from django.db import models
from django.contrib.auth.models import User


class Pregunta(models.Model):
    titulo = models.CharField(max_length=255)
    contenido = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    votos = models.IntegerField(default=0)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo


class Respuesta(models.Model):
    pregunta = models.ForeignKey(
        Pregunta, on_delete=models.CASCADE, related_name="respuestas"
    )
    contenido = models.CharField(max_length=200)
    votos = models.IntegerField(default=0)

    def __str__(self):
        return self.contenido


class Comentario(models.Model):
    contenido = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    respuesta = models.ForeignKey(
        Respuesta,
        related_name="comentarios",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    pregunta = models.ForeignKey(
        Pregunta,
        related_name="comentarios",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)


class Voto(models.Model):
    es_positivo = models.BooleanField()
    pregunta = models.ForeignKey(
        Pregunta, null=True, blank=True, on_delete=models.CASCADE
    )
    respuesta = models.ForeignKey(
        Respuesta, null=True, blank=True, on_delete=models.CASCADE
    )
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
