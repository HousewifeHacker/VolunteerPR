from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('orgs', views.OrganizationViewSet)
router.register('matches', views.MatchViewSet)
router.register('needs', views.NeedViewSet)

urlpatterns = [path("", include(router.urls))]