"""twitter_clone_back URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from twitter_clone_backend import views


urlpatterns = [
    path('api/admin/', admin.site.urls),
    # Gets a list of all Tweets
    path('api/tweets/', views.TweetsView),
    # Gets list that this viewer follows. Yes, the name is confusing
    path('api/getFollowing/<str:viewer_name>/', views.FollowingListView.as_view(), name='following-list-view'),
    # Gets user info from username
    path('api/getUserInfo/<str:username>/', views.UserInfo.as_view(), name='get-user-info-from-username'),
    # Gets a random Tweet. Mostly for testing.
    path('api/getRandomTweet/', views.RandomTweetView.as_view(), name='random-tweet'),
    # For frontend
    url(r'^', views.Frontend.as_view(), name='frontend')
]
