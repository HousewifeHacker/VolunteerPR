from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _

from .models import User


class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
            (_('Personal Info'), {'fields': ('name',)}),
            (_('Permissions'), {
                'fields': ('is_active', 'is_staff', 'is_superuser')
            }),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )
    model = User
    list_display = ["email", "name"]
    list_filter = ("email",)
    search_fields = ("email", "name")
    ordering = ("email",)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
