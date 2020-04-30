import uuid
from datetime import datetime

from django.conf import settings
from django.db import models
from model_utils.models import TimeStampedModel
from rest_framework.reverse import reverse
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from .helpers import NEED_TYPE_CHOICES

def validate_future_date(value):
    today = datetime.now().date()
    if value <= today:
        raise ValidationError(
            _('Date %(value) must be in the future.'),
            params={'value': value},
        )

class Organization(TimeStampedModel):
    """ Has many needs """

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=300, unique=True)
    description = models.TextField()
    organizers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="organizations", blank=True)

    def __str__(self):
        return self.title


class Need(TimeStampedModel):
    """ Has many matches. Has one organizer and one organization """

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="needs", blank=True, null=True, on_delete=models.SET_NULL
    )
    organization = models.ForeignKey(
        Organization, related_name="needs", on_delete=models.CASCADE
    )
    volunteers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, through='Match', blank=True
    )
    category = models.CharField(max_length=80)
    city = models.CharField(max_length=40)
    due = models.DateField(validators=[validate_future_date], blank=True, null=True)
    lat = models.DecimalField(max_digits=10, decimal_places=6, blank=True, null=True)
    lng = models.DecimalField(max_digits=10, decimal_places=6, blank=True, null=True)

    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    upper_limit = models.PositiveSmallIntegerField(
        verbose_name="Maximum allowed matches",
        blank=True,
        null=True,
    )
    lower_limit = models.PositiveSmallIntegerField(
        verbose_name="Minimum needed matches",
        blank=True,
        null=True,
    )

    need_type = models.CharField(max_length=20, choices=NEED_TYPE_CHOICES, default=NEED_TYPE_CHOICES[0][0])

    class Meta:
        indexes = [models.Index(fields=["organization", "due"])]
        ordering = ["-due"]

    def __str__(self):
        return "{}-{}".format(self.organization, self.title)


class Match(TimeStampedModel):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    need = models.ForeignKey(Need, related_name="matches", on_delete=models.CASCADE)
    volunteer = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="matches", on_delete=models.CASCADE
    )
    # todo review after event

    class Meta:
        verbose_name_plural = "Matches"
        indexes = [models.Index(fields=["volunteer", ])]

    def __str__(self):
        return "{}-{}".format(self.volunteer.email, self.need.title)
