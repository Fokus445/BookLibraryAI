# Generated by Django 4.1.7 on 2023-10-03 11:24

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("recommender", "0006_alter_author_first_name_alter_author_last_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="book",
            name="description",
        ),
    ]