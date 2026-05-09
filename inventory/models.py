from django.db import models
from gamenets.models import GameNet


class BuffetItem(models.Model):
    gamenet = models.ForeignKey(GameNet, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price_b = models.PositiveIntegerField()
    price_s = models.PositiveIntegerField()
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name