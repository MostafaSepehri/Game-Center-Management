from django.db import models
from gamenets.models import GameNet


class Station(models.Model):
    gamenet = models.ForeignKey(GameNet, on_delete=models.CASCADE)
    STATUS_CHOICES = [
    ("free", "فعال"),
    ("playing", "در حال استفاده"),
    ("offline", "غیرفعال"),
    ]
    name = models.CharField(max_length=60)
    station_type = models.CharField(max_length=20)  # PC / PS5 / Xbox
    status = models.CharField(
    max_length=20,
    choices=STATUS_CHOICES,
    default="free"
    )

    def __str__(self):
        return self.name


class StationTariff(models.Model):
    gamenet = models.ForeignKey(GameNet, on_delete=models.CASCADE)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    price_per_hour = models.PositiveIntegerField()
    is_vip = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    

class VipService(models.Model):
    gamenet = models.ForeignKey(GameNet, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    price = models.PositiveIntegerField()