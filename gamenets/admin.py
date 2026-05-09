from django.contrib import admin
from .models import GameNet

# Register your models here.
@admin.register(GameNet)
class GameNetAdmin(admin.ModelAdmin):
    pass