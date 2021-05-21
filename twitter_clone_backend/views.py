# from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.http.response import Http404
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from django.views import generic

from .serializers import TweetSerializer, PosterSerializer
from .models import Tweet, Poster, Explanation, Viewer, Article

import random
from string import ascii_letters
import os.path
from glob import glob

from .helpers import fetchImg

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

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


class WholePostFromID(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        post_id = self.kwargs['id']
        
        post = Tweet.objects.get(pk=post_id)
        poster = post.poster
        explanation = post.explanation
        article = post.article

        
        if post.article is None:
            text = post.text
        else:
            text = " ".join(article.text.split(" ")[:30])
        
        def image_cat_gen():
            category = fetchImg(text)
            api_base = "/api/img/"
            return api_base+category+"/"+''.join(random.choice(ascii_letters) for c in range(10)) if category is not None else None

        response = dict(
            # Poster info
            username = poster.username,
            displayName = poster.displayName,
            avatar = poster.avatar,
            verified = poster.verified,
            # Post content
            text = text,
            media = post.image if post.article is None else "news:"+ str(article.id),
            img = image_cat_gen(),
            # Explanation
            explanation = explanation.text
        )

        return JsonResponse(response)

class CustomImageView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        category = self.kwargs['category']

        directory = os.path.join(PROJECT_ROOT, "imgs", category)

        eligible_list = (
            glob(os.path.join(directory, "*.png")) +
            glob(os.path.join(directory, "*.jpg"))+
            glob(os.path.join(directory, "*.jpeg"))
            )

        if len(eligible_list) == 0: # Make sure that there are available images
            return Response("Category not found: "+category, status=404)
        
        img_path = random.choice(eligible_list)

        with open(img_path, "rb") as f:
            _, extension = os.path.splitext(img_path)
            response = HttpResponse(
                f.read(), 
                content_type=f"image/{extension[1:]}"
                )
        
        return response

class ArticleView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        article_id = self.kwargs['article_id']
        article = Article.objects.get(pk=article_id)

        response = dict(
            title = article.title,
            text = article.text
        )

        return JsonResponse(response)

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
