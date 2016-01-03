from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from .models import Map, Cell


class NestedCellSerializer(ModelSerializer):

    class Meta:
        model = Cell


class MapSerializer(ModelSerializer):
    cells = NestedCellSerializer(many=True, read_only=True)

    class Meta:
        model = Map


class CellSerializer(ModelSerializer):
    map = PrimaryKeyRelatedField(queryset=Map.objects.all())

    class Meta:
        model = Cell
