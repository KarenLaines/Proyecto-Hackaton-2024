from django.db.models import F
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required

from .models import Pregunta, Respuesta, Comentario


def index(request):
    latest_pregunta_list = Pregunta.objects.order_by("-fecha_publicacion")[:5]
    context = {"latest_pregunta_list": latest_pregunta_list}
    return render(request, "polls/index.html", context)


def detail(request, pregunta_id):  # Cambia question_id por pregunta_id
    pregunta = get_object_or_404(Pregunta, pk=pregunta_id)
    return render(request, "polls/detail.html", {"pregunta": pregunta})


def results(request, pregunta_id):
    pregunta = get_object_or_404(Pregunta, pk=pregunta_id)
    response = f"Estás viendo los resultados de la pregunta: {pregunta.titulo}."
    return HttpResponse(response)


def vote(request, pregunta_id):
    pregunta = get_object_or_404(Pregunta, pk=pregunta_id)
    try:
        selected_respuesta = pregunta.respuestas.get(pk=request.POST["respuesta"])
    except (KeyError, Respuesta.DoesNotExist):
        return render(
            request,
            "polls/detail.html",
            {
                "pregunta": pregunta,
                "error_message": "No seleccionaste una respuesta.",
            },
        )
    else:
        selected_respuesta.votos += 1
        selected_respuesta.save()
        return HttpResponseRedirect(reverse("polls:results", args=(pregunta.id,)))


# @login_required
def add_comment(request, pregunta_id):
    pregunta = get_object_or_404(Pregunta, pk=pregunta_id)
    if request.method == "POST":
        contenido = request.POST.get("comentario")
        if contenido:
            nuevo_comentario = Comentario(
                contenido=contenido, pregunta=pregunta, usuario=request.user
            )
            nuevo_comentario.save()

        # Redirige a la página de detalle de la pregunta después de agregar el comentario
        return redirect("polls:detail", pregunta_id=pregunta_id)


def add_question(request):
    if request.method == "POST":
        titulo = request.POST.get("titulo")
        contenido = request.POST.get("contenido")
        if titulo and contenido:
            Pregunta.objects.create(
                titulo=titulo, contenido=contenido, usuario=request.user
            )
        return redirect("polls:index")
    return render(request, "polls/index.html")
