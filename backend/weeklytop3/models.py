from django.db import models

# Create your models here.


class weeklytop3(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.CharField(max_length=128, null=False)
    top_name = models.CharField(max_length=128, null=False)
    top_salesAmt = models.BigIntegerField(null=False)
    top_audiCnt = models.BigIntegerField(null=False)
    second_name = models.CharField(max_length=128, null=False)
    second_salesAmt = models.BigIntegerField(null=False)
    second_audiCnt = models.BigIntegerField(null=False)
    third_name = models.CharField(max_length=128, null=False)
    third_salesAmt = models.BigIntegerField(null=False)
    third_audiCnt = models.BigIntegerField(null=False)
    class Meta:
        # Table이름을 "User"로 정한다. default 이름은 user_user가 된다.
        db_table = "weeklytop3"