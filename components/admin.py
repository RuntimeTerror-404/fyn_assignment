
from django.contrib import admin
from .models import Component

@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'price')
    list_filter = ('type',)
    search_fields = ('name',)
