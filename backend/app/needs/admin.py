from django.contrib import admin

from .models import Match, Need, Organization

admin.site.register(Need)
admin.site.register(Match)
admin.site.register(Organization)
