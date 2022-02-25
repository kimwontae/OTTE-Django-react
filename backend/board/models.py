from django.db import models


class Board(models.Model):
    title = models.CharField(max_length=200)
    username = models.CharField(max_length=200)
    content = models.TextField()
    readcount = models.IntegerField()
    writedate = models.DateField(auto_now=True)

    def __str__(self):
        """A string representation of the model."""
        return self.title


class UploadFileModel(models.Model):
    description = models.CharField(max_length=255)
    images = models.ImageField(blank=True, upload_to='images/')
    upload_at = models.DateField(auto_now=True)


class comment(models.Model):
    board_id = models.ForeignKey(
        "Board", related_name="board", on_delete=models.CASCADE, db_column="board_id")
    title = models.CharField(max_length=200)
    comment_user = models.CharField(max_length=200)
    comment_content = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.title
