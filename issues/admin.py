from django.contrib import admin
from .models import Issue

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'component', 'status', 'description')
    list_filter = ('status',)
    search_fields = ('vehicle__registration_number', 'component__name', 'description')
