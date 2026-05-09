from django.urls import path
from .views import station_view, station_edit, station_delete


app_name = 'stations'
urlpatterns = [
    path('', station_view, name='index'),
    path("edit/<int:pk>/", station_edit, name="station_edit"),
    path("delete/<int:pk>/", station_delete, name="station_delete"),
]