from django.db import models
from django.utils import timezone
from stations.models import Station, StationTariff
from gamenets.models import GameNet
from django.contrib.auth.models import User


class Session(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    gamenet = models.ForeignKey(GameNet, on_delete=models.CASCADE)
    tariff = models.ForeignKey(StationTariff, on_delete=models.CASCADE)
    
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    started_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"{self.station.name} - {self.start_time.strftime('%H:%M:%S')}"
    
    def get_duration_minutes(self):
        if self.is_active:
            now = timezone.now()
        else:
            now = self.end_time
        
        duration = (now - self.start_time).total_seconds() / 60
        return int(duration)
    
    def get_current_cost(self):
        if not self.tariff:
            return 0
        
        minutes = self.get_duration_minutes()
        hours = minutes / 60
        return int(hours * self.tariff.price_per_hour)