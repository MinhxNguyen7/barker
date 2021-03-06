from django.db import models


class Poster(models.Model):
    """
    "User" who posts the post
    """
    username = models.CharField(max_length=15, default='noUser', primary_key=True, unique=True)
    displayName = models.CharField(max_length=140, default='')
    avatar = models.TextField(default='', blank=True) # url of avatar
    verified = models.BooleanField(default=False)

    def __str__(self):
        return "User: " + str(self.username)


class Explanation(models.Model):
    name = models.CharField(max_length=255, default='', primary_key=True) # Name identifier of explanation
    text = models.TextField(max_length=2400, default='', blank=True) # Explanation text. Can be blank

    def __str__(self):
        return f"Explanation named {self.name}"


class Article(models.Model):
    title = models.TextField(default='', blank=True, null=True, max_length=300)
    text = models.TextField(default='')
    source = models.TextField(default='article', max_length=50)


class Tweet(models.Model):
    poster = models.ForeignKey(Poster, on_delete=models.CASCADE, default='noUser')
    text = models.TextField(default='', max_length=141)
    image = models.TextField(default='', blank=True, null=True) # url of attached image. Can be empty string
    article = models.ForeignKey(Article, on_delete=models.CASCADE, blank=True, null=True)
    explanation = models.ForeignKey( # Relation to explanation. Can be empty and/or null
        Explanation, on_delete=models.CASCADE, default='default', blank=True, null=True)

    def __str__(self):
        return f"Tweet by user {self.poster}:\n{self.text}"


class Viewer(models.Model):
    """
    The perspective from which the audience sees the world
    """
    name = models.CharField(max_length=140, primary_key=True, default='anon')
    following = models.ManyToManyField(Poster)

    def __str__(self):
        return "Viewer named: " + str(self.name)
