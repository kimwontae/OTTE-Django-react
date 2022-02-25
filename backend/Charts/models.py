# backend/post/models.py
from django.db import models


class charts(models.Model):
    id = models.AutoField(primary_key=True)
    OTT = models.CharField(max_length=200)
    rank = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    date = models.CharField(max_length=200)

    def __str__(self):
        """A string representation of the model."""
        return self.title
