from django.db import models
from vehicles.models import Vehicle

class Transaction(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="transactions")
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Transaction for {self.vehicle.registration_number} on {self.date} - ${self.total_price}"
