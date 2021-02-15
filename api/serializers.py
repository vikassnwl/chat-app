from django.contrib.auth import models
from django.db.models import fields
from rest_framework import serializers
from .models import Message
from django.contrib.auth.models import User


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = '__all__'


class UserMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
