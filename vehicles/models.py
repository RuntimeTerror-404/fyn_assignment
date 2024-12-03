from django.db import models

class Vehicle(models.Model):
    registration_number = models.CharField(max_length=20, unique=True)
    owner_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.registration_number} - {self.owner_name}"
