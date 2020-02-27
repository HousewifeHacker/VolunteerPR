import uuid

from django.db import models
from model_utils.models import TimeStampedModel
from rest_framework.reverse import reverse

from needs.models import Need

# from users.models import User
from django.contrib.auth.models import User


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
