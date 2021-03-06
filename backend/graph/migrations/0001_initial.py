# Generated by Django 4.0 on 2022-01-10 04:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='graph',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('date', models.CharField(max_length=128)),
                ('name', models.CharField(max_length=128)),
                ('rank', models.BigIntegerField()),
                ('audiCnt', models.BigIntegerField()),
                ('salesAmt', models.BigIntegerField()),
            ],
            options={
                'db_table': 'graph',
            },
        ),
    ]
