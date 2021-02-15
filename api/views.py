from django.shortcuts import render
from rest_framework import generics, serializers
from .models import Message
from .serializers import MessageSerializer, UserMessagesSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User

# Create your views here.


class MessageList(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


@api_view(['POST'])
def createMessage(request):
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET'])
def userMessages(request, id):
    user = User.objects.get(id=id)
    messages = Message.objects.filter(user=user)
    serializer = UserMessagesSerializer(messages, many=True)
    return Response(serializer.data)
