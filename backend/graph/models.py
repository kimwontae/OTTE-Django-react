from django.db import models

# Create your models here.


class graph(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.CharField(max_length=128, null=False)
    name = models.CharField(max_length=128, null=False)
    rank = models.BigIntegerField(null=False)
    audiCnt = models.BigIntegerField(null=False)
    salesAmt = models.BigIntegerField(null=False)
    class Meta:
        # Table이름을 "User"로 정한다. default 이름은 user_user가 된다.
        db_table = "graph"