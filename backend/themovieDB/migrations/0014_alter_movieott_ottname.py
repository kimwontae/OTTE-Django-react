# Generated by Django 3.2.9 on 2022-02-04 02:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('themovieDB', '0013_rename_ottename_movieott_ottname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movieott',
            name='ottname',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
