# from django.shortcuts import render
from rest_framework import viewsets, generics

from .serializers import TweetSerializer, PosterSerializer
from .models import Tweet, Poster

import random


# View for all tweets
class TweetsView(viewsets.ModelViewSet):
    serializer_class = TweetSerializer

    def get_queryset(self):
        return Tweet.objects.all()


class FollowingListView(generics.ListAPIView):
    serializer_class = PosterSerializer

    def get_queryset(self):
        """
        This view should return a list posters followed by the viewer
        as determined by the username portion of the URL.
        """

        viewer_name = self.kwargs['viewer_name']

        return Poster.objects.filter(viewer__name=viewer_name)


class RandomTweetView(generics.ListAPIView):
    serializer_class = TweetSerializer

    def get_queryset(self):
        """
        Gets a random Tweet by looking at primary keys
        of all Tweets and picking one.
        """
        pks = Tweet.objects.values_list('pk', flat=True)
        random_pk = random.sample(list(pks), 1)[0]
        return Tweet.objects.filter(pk=random_pk)


class UserInfo(generics.ListAPIView):
    serializer_class = PosterSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        poster = Poster.objects.filter(pk=username)

        if len(poster) == 1:
            return poster
        else:
            raise LookupError('No user with username "'+str(username)+'" found')
