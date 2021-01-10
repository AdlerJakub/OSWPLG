from django.contrib.auth.models import User
from rest_framework import serializers

from api.pizza_app.models import Dish

from api.pizza_app.models import Order, OrderCredentials


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ('id', 'name', 'ingredients', 'price', 'description')
        extra_kwargs = {
            'name': {'validators': []},
        }

class OrderCredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCredentials
        fields = ('id', 'name', 'surname', 'street', 'houseNumber', 'flatNumber', 'phoneNumber', 'email', 'city', 'zipCode')


class OrderSerializer(serializers.ModelSerializer):
    credentials = OrderCredentialsSerializer()
    dishes = DishSerializer(many=True)
    class Meta:
        model = Order
        fields = ('id', 'realized', 'dishes', 'credentials')

    def create(self, validated_data):
        credentials_data = validated_data.pop('credentials')
        dishes_data = validated_data.pop('dishes')
        order = Order.objects.create(**validated_data)
        for dish_data in dishes_data:
            dish, _ = Dish.objects.get_or_create(**dish_data)
            order.dishes.add(dish)
        credentials = OrderCredentials.objects.create(order=order, **credentials_data)
        order.credentials = credentials
        order.save()
        return order


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'],
                                        email=validated_data['email'])
        return user
