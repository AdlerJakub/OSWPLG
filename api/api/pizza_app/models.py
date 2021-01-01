from django.db import models

# Create your models here.
from django.urls import reverse


class Dish(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    ingredients = models.JSONField(blank=True, null=True)
    price = models.FloatField()
    description = models.TextField(blank=True, null=True)

    def get_absolute_url(self):
        return reverse('dish_detail', args=[self.id])
