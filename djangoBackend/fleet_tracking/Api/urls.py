from django.urls import path
from .views import test_push

urlpatterns = [
    path("test/push/<str:vehicle_id>/", test_push),
]
