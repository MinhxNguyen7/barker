from django.contrib import admin
from .models import Tweet, Poster, Viewer, Explanation


class TweetAdmin(admin.ModelAdmin):
    list_display = ('text', 'image')


class PosterAdmin(admin.ModelAdmin):
    list_display = ('username', 'displayName', 'avatar', 'verified')


class ExplanationAdmin(admin.ModelAdmin):
    pass


class ViewerAdmin(admin.ModelAdmin):
    pass


# Register  models.
admin.site.register(Tweet, TweetAdmin)
admin.site.register(Poster, PosterAdmin)
admin.site.register(Viewer, ViewerAdmin)
admin.site.register(Explanation, ExplanationAdmin)
