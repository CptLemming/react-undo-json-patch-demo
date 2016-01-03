from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

from map.views import (
    MapViewSet,
    CellViewSet,
)

router = DefaultRouter()
router.register(r'maps', MapViewSet)
router.register(r'cells', CellViewSet)

urlpatterns = [
    url(r'^map/', include(router.urls)),
]
