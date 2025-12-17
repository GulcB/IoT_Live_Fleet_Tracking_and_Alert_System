from django.urls import path
from .views import FeelAdd, FeelList, FeelDetail

urlpatterns = [
	path("add/", FeelAdd.as_view(), name='feel-add'),
	path("list/", FeelList.as_view(), name='feel-list'),
	path("detail/<int:pk>/", FeelDetail.as_view(), name='feel-detail')
]
