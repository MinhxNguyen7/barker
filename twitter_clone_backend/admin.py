from django.contrib import admin
from .models import Tweet, Poster, Viewer


class TweetAdmin(admin.ModelAdmin):
    list_display = ('text', 'image')


class PosterAdmin(admin.ModelAdmin):
    list_display = ('username', 'displayName', 'avatar', 'verified')


class FollowingListInLine(admin.TabularInline):
    model = Viewer.following.through


class ViewerAdmin(admin.ModelAdmin):
    inlines = [FollowingListInLine]


# Register  models.
admin.site.register(Tweet, TweetAdmin)
admin.site.register(Poster, PosterAdmin)
admin.site.register(Viewer, ViewerAdmin)
