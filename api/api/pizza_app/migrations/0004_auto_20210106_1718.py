# Generated by Django 3.1.4 on 2021-01-06 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pizza_app', '0003_order_ordercredentials'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='isRealized',
            field=models.IntegerField(),
        ),
    ]