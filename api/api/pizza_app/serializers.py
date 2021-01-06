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


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'realized','dishes', 'credentials')


class OrderCredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCredentials
        fields = ('id', 'name', 'surname', 'street', 'houseNumber', 'flatNumber', 'phoneNumber', 'email')


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
