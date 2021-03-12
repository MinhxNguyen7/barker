from rest_framework import serializers
from .models import Tweet, Poster


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ('poster', 'text', 'image')


class PosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poster
        fields = ('username', 'displayName', 'avatar', 'verified')
