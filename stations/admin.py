from django.contrib import admin
from .models import Station, StationTariff

# Register your models here.
@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    pass

@admin.register(StationTariff)
class StationTariffAdmin(admin.ModelAdmin):
    pass