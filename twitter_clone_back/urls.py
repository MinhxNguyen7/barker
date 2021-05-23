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
from django.urls import path, re_path
from django.conf.urls import url

from twitter_clone_backend import views

# TODO: Make trailing slash optional with re_path() instead of path()
urlpatterns = [
    # Admin site
    path('api/admin/', admin.site.urls),
    # Gets all the info in a post
    path('api/wholePost/<int:id>/', views.WholePostFromID.as_view(), name='whole-post-from-id-view'),
    # Gets a list of all Tweets
    # path('api/tweets/', views.TweetsView.as_view({"get": "list"})),
    # Gets a list of all Viewers
    path('api/viewers/', views.ViewersView.as_view({"get": "list"})),
    # Gets list that this viewer follows. Yes, the name is confusing
    path('api/getFollowing/<str:viewer_name>/', views.FollowingListView.as_view(), name='following-list-view'),
    # Gets list of post IDs for a viewer
    path('api/ViewerToId/<str:viewer_name>/', views.ViewerToIdList.as_view({"get": "list"}), name='viewer-to-id-view'),
    # Gets custom local image by category
    path('api/img/<str:category>/<str:shit>', views.CustomImageView.as_view(), name='custom-image-view'),
    # Gets full article
    path('api/article/<int:article_id>/', views.ArticleView.as_view(), name='article-from-id-view'),
    # For frontend
    url(r'^', views.Frontend.as_view(), name='frontend')
]
