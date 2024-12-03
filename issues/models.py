from django.db import models
from components.models import Component
from vehicles.models import Vehicle

class Issue(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
    ]

    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="issues")
    component = models.ForeignKey(Component, on_delete=models.CASCADE, related_name="issues")
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Issue for {self.vehicle.registration_number} - {self.status}"
