from django.db import models
from stations.models import Station

# Create your models here.
class Reservation(models.Model):

    station = models.ForeignKey(
        Station,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=11)
    pay = models.PositiveIntegerField(default=0, null=True, blank=True)
    date_choice = models.DateTimeField()
    start_time = models.DateTimeField()