from django.db import models

class Component(models.Model):
    TYPE_CHOICES = [
        ('new', 'New'),
        ('repair', 'Repair'),
    ]

    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.type}) - ${self.price}"


# Create your models here.
