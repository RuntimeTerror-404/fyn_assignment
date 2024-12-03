
from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'total_price', 'date')
    list_filter = ('date',)
    search_fields = ('vehicle__registration_number',)
