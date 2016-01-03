from django.db import models


class Map(models.Model):
    label = models.CharField('Label', max_length=100)
    height = models.PositiveIntegerField('Height')
    width = models.PositiveIntegerField('Width')

    def __str__(self):
        return self.label


class Cell(models.Model):
    TYPE_TREE = 'tree'
    TYPE_GRASS = 'grass'
    TYPE_ROCK = 'rock'
    TYPE_WATER = 'water'
    TYPE_CHOICES = (
        (TYPE_TREE, 'Tree'),
        (TYPE_GRASS, 'Grass'),
        (TYPE_ROCK, 'Rock'),
        (TYPE_WATER, 'Water'),
    )

    map = models.ForeignKey('Map', related_name='cells')
    type = models.CharField('Type', choices=TYPE_CHOICES, max_length=100)
    position_x = models.PositiveIntegerField('Position X')
    position_y = models.PositiveIntegerField('Position Y')

    def __str__(self):
        return '{0}: {1}x{2}'.format(self.map.label, self.position_x, self.position_y)
