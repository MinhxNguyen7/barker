# from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from rest_framework import viewsets, generics
from rest_framework.response import Response
from django.views import generic

from .serializers import TweetSerializer, PosterSerializer, ExplanationSerializer
from .models import Tweet, Poster, Explanation, Viewer

import random
import os.path


class ViewersView(viewsets.ModelViewSet):

    def list(self, request, *args, **kwargs):
        return Response(Viewer.objects.all().values_list('name', flat=True))


class ViewerToIdList(viewsets.ModelViewSet):
    """
    Returns a list of post IDs for a viewer
    """

    def list(self, request, *args, **kwargs):
        viewer_name = self.kwargs['viewer_name']

        # List of posters' names who are followed by the viewer above
        following_list = Poster.objects.filter(viewer__name=viewer_name).values_list('username', flat=True)

        # 'Pure,' int list of post IDs
        ids_list = Tweet.objects.filter(poster__username__in=following_list).values_list('id', flat=True)
        return Response(ids_list)


class TweetsView(viewsets.ModelViewSet):
    """View for all tweets"""
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
    """
    Gets a random Tweet by looking at primary keys
    of all Tweets and picking one.
    """
    serializer_class = TweetSerializer

    def get_queryset(self):
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


class ExplanationView(generics.ListAPIView):
    serializer_class = ExplanationSerializer

    def get_queryset(self):
        expl_name = self.kwargs['expl_name']
        return Explanation.objects.filter(pk=expl_name)

class PostFromIDView(generics.ListAPIView):
    serializer_class = TweetSerializer

    def get_queryset(self):
        pk = self.kwargs['id']
        return Tweet.objects.filter(pk=pk)


class Frontend(generic.View):
    """
    Serves the compiled frontend entry point
    Remember to run "npm run build" first
    """

    def get(self, request):
        print(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app.
                """,
                status=501,
            )
