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
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    houseNumber = models.CharField(max_length=255)
    flatNumber = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    zipCode = models.CharField(max_length=255)

    def get_absolute_url(self):
        return reverse('order_credentials_detail', args=[self.id])


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    realized = models.IntegerField()
    dishes = models.ManyToManyField(Dish)
    credentials = models.OneToOneField(OrderCredentials, on_delete=models.CASCADE, blank=True, null=True)

    def get_absolute_url(self):
        return reverse('order_detail', args=[self.id])
