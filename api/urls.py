from django.urls import path
from . import views


urlpatterns = [
    path('list', views.MessageList.as_view()),
    path('create', views.createMessage),
    path('users', views.UserList.as_view()),
    path('user/<int:id>/messages', views.userMessages)
]
