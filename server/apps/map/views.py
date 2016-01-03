from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from json_patch.patch import Patch

from .models import Map, Cell
from .serializers import MapSerializer, CellSerializer


class MapViewSet(ModelViewSet):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

    def partial_update(self, request, *args, **kwargs):
        obj = self.get_object()

        # Pass patch data to Patch class
        patch = Patch(request.data)

        # Apply the patch to our Map instance
        patch.apply(obj)

        return Response(status=HTTP_204_NO_CONTENT)


class CellViewSet(ModelViewSet):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer
