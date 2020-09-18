from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    audio = models.URLField(unique=True)
    lrc = models.TextField(max_length=10000)
    delay = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    def __str__(self):
        return f'{self.title} - {self.artist}'
