import uuid

# from users.models import User
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel
from rest_framework.reverse import reverse

from organizations.models import Organization


class Need(TimeStampedModel):
    """ Has many matches """

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    organizer = models.ForeignKey(
        User, related_name="organizer", on_delete=models.CASCADE
    )
    organization = models.ForeignKey(
        Organization, related_name="organization", on_delete=models.CASCADE
    )
    due = models.DateField()
    lat = models.DecimalField(max_digits=10, decimal_places=6)
    lng = models.DecimalField(max_digits=10, decimal_places=6)

    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    upper_limit = models.PositiveSmallIntegerField(
        verbose_name="Maximum allowed matches"
    )
    lower_limit = models.PositiveSmallIntegerField(
        verbose_name="Minimum needed matches"
    )

    # TODO  isnt past due
    # TODO hasnt been filled

    NEEDS = "ND"
    NECESSITIES = "NC"
    RESOURCES = "RS"
    VOLUNTEER = "VO"
    NEED_TYPE_CHOICES = [
        (NEEDS, "Needs"),
        (NECESSITIES, "Necessities"),
        (RESOURCES, "Resources"),
        (VOLUNTEER, "Volunteer Opportunities"),
    ]
    need_type = models.CharField(max_length=2, choices=NEED_TYPE_CHOICES, default=NEEDS)

    class Meta:
        indexes = [models.Index(fields=["organization", "due"])]
        ordering = ["-due"]

    def __str__(self):
        return "{}-{}".format(self.organization, self.title)
