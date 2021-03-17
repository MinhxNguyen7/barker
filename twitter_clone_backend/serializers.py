from rest_framework import serializers
from .models import Tweet, Poster, Explanation


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ('poster', 'explanation', 'text', 'image')


class PosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poster
        fields = ('username', 'displayName', 'avatar', 'verified')


class ExplanationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Explanation
        fields = ('name', 'text')
