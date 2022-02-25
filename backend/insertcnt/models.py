#backend/post/models.py
from datetime import datetime
from django.db import models
##################################################################


#검색기록
class insertcnt(models.Model):
    text = models.TextField(max_length=200)
    sysdate = models.DateField(auto_now='sysdate')
    systime = models.TimeField(auto_now='sysdate')

    
    def __str__(self):
        """A string representation of the model."""
        return self.title

#실시간 검색어
class insertcntrank(models.Model):
    text = models.TextField(max_length=200, null=True)
    #rank = models.DecimalField(max_digits=3,decimal_places=2)
    def __str__(self):
        """A string representation of the model."""
        return self.title

#매일 1-20순위(작품별 순위추적) 
class totalrank(models.Model):
    text = models.TextField(max_length=200)
    rank = models.IntegerField(null=True)
    sysdate = models.TextField(null=True)
    def __str__(self):
        """A string representation of the model."""
        return self.text
