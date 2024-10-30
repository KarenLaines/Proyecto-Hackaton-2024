from django.urls import path

from . import views

app_name = "polls"

urlpatterns = [
    path("", views.index, name="index"),
    path("add_question/", views.add_question, name="add_question"),
    path("<int:pregunta_id>/", views.detail, name="detail"),
    path("<int:pregunta_id>/results/", views.results, name="results"),
    path("<int:pregunta_id>/vote/", views.vote, name="vote"),
    path("<int:pregunta_id>/add_comment/", views.add_comment, name="add_comment"),
]
