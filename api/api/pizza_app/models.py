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


class OrderCredentials(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    surname = models.CharField(max_length=255, unique=True)
    street = models.CharField(max_length=255, unique=True)
    houseNumber = models.CharField(max_length=255, unique=True)
    flatNumber = models.CharField(max_length=255, unique=True)
    phoneNumber = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=255, unique=True)

    def get_absolute_url(self):
        return reverse('order_credentials_detail', args=[self.id])

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    realized = models.IntegerField()
    dishes = models.ForeignKey(Dish, on_delete=models.CASCADE)
    credentials = models.OneToOneField(OrderCredentials, on_delete=models.CASCADE)

    def get_absolute_url(self):
        return reverse('order_detail', args=[self.id])
