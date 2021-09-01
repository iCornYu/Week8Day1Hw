from django.urls import path, include
from . import views

urlpatterns = [
    path('add/', views.postToDo, name="api-add"),
    path('get/', views.getToDo, name="api-get"),
    path('', views.getToDo, name="api-get"),
    path('delete/', views.deleteToDo, name="api-delete"),

]
