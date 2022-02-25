# Generated by Django 3.2.9 on 2022-02-16 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('themovieDB', '0014_alter_movieott_ottname'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('otteid', models.IntegerField(null=True)),
                ('username', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('writedate', models.DateField(auto_now=True)),
            ],
        ),
    ]