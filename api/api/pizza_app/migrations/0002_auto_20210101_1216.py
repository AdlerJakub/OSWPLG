# Generated by Django 3.1.4 on 2021-01-01 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pizza_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dish',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dish',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='dish',
            name='ingredients',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dish',
            name='price',
            field=models.FloatField(),
        ),
    ]