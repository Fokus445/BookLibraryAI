# Generated by Django 4.1.7 on 2023-10-19 09:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("books", "0003_alter_book_average_rating"),
    ]

    operations = [
        migrations.AlterField(
            model_name="book",
            name="isbn",
            field=models.CharField(max_length=17, unique=True, verbose_name="isbn"),
        ),
    ]
