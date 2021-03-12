from django.db import models


# "User" who posts the post
class Poster(models.Model):
    username = models.CharField(max_length=15, default='noUser', primary_key=True, unique=True)
    displayName = models.CharField(max_length=140, default='')
    avatar = models.TextField(default='') # url of avatar
    verified = models.BooleanField(default=False)

    def __str__(self):
        return "User: " + str(self.username)


class Tweet(models.Model):
    poster = models.ForeignKey(Poster, on_delete=models.CASCADE, default='noUser')
    text = models.TextField(default='This tweet is empty')
    image = models.TextField(default='') # url of attached image. Can be empty string

    def __str__(self):
        return f"Tweet by user {self.poster}:\n{self.text}"


# The perspective from which the audience sees the world
class Viewer(models.Model):
    name = models.CharField(max_length=140, primary_key=True, default='anon')
    following = models.ManyToManyField(Poster)

    def __str__(self):
        return "Viewer named: " + str(self.name)
