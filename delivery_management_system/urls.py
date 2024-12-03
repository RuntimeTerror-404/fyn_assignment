from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/components/', include('components.urls')),
    path('api/vehicles/', include('vehicles.urls')),
    path('api/issues/', include('issues.urls')),
    path('api/transactions/', include('transactions.urls')),
]
