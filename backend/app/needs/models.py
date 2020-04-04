import uuid

# from users.models import User
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel
from rest_framework.reverse import reverse


class Organization(TimeStampedModel):
    """ Has many needs """

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=300)
    description = models.TextField()
    organizers = models.ManyToManyField(User, related_name="organizers")

    def __str__(self):
        return self.title


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


class Match(TimeStampedModel):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    need = models.ForeignKey(Need, related_name="need", on_delete=models.CASCADE)
    volunteer = models.ForeignKey(
        User, related_name="volunteer", on_delete=models.CASCADE
    )
    due = models.DateField()
    # todo review after event

    class Meta:
        verbose_name_plural = "Matches"
        indexes = [models.Index(fields=["volunteer", "due"])]

    def __str__(self):
        return "{}-{}".format(self.volunteer, self.need)
