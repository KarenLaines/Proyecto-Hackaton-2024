# Generated by Django 5.1.2 on 2024-10-30 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("polls", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="respuesta",
            name="fecha_publicacion",
        ),
        migrations.RemoveField(
            model_name="respuesta",
            name="usuario",
        ),
        migrations.AlterField(
            model_name="respuesta",
            name="contenido",
            field=models.CharField(max_length=200),
        ),
    ]
