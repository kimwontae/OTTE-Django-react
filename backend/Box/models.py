#backend/post/models.py
from django.db import models

class Box(models.Model):
    date = models.CharField(max_length=200)
    rank = models.CharField(max_length=200)
    movieNm = models.CharField(max_length=200)
    openDT = models.CharField(max_length=200)
    salesAmt = models.CharField(max_length=200)
    salesAcc = models.CharField(max_length=200)
    audiCnt = models.CharField(max_length=200)
    audiAcc = models.CharField(max_length=200)
    


    def __str__(self):
        """A string representation of the model."""
        return self.title