import uuid

from django.db import models
from model_utils.models import TimeStampedModel
from rest_framework.reverse import reverse

# from users.models import User
from django.contrib.auth.models import User


class Organization(TimeStampedModel):
    """ Has many needs """

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    organizers = models.ManyToManyField(User, related_name="organizers")

    def __str__(self):
        return self.title
