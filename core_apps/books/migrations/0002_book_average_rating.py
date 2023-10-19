# Generated by Django 4.1.7 on 2023-10-19 07:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("books", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="book",
            name="average_rating",
            field=models.DecimalField(
                decimal_places=2, default=0, max_digits=3, verbose_name="average rating"
            ),
        ),
    ]
