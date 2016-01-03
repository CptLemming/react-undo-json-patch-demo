from django.contrib import admin

from .models import Map, Cell


class MapAdmin(admin.ModelAdmin):
    pass


class CellAdmin(admin.ModelAdmin):
    pass


admin.site.register(Map, MapAdmin)
admin.site.register(Cell, CellAdmin)
