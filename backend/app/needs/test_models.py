from datetime import datetime, timedelta

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


from .models import Need, Organization, Match

def create_user(username="testUser", password="testPass1212"):
    """Helper function to create new user"""
    return get_user_model().objects.create_user(username, password)

def create_organization(organizers, title="Diapers4Change"):
    """Helper to create an organization"""
    org = Organization.objects.create(
        title=title,
        description="super awesome description",
    )
    org.organizers.set(organizers)
    org.save()
    return org


class NeedsModelsTests(TestCase):

    def test_string_need(self):
        """Test string representation of a Need"""
        organizer = create_user(username="testOrganizer")
        organization = create_organization(organizers=[organizer], title="D4C")
        need = Need.objects.create(
            organization=organization,
            title="Bring diapers to Guanica",
        )

        self.assertEqual(str(need), "D4C-Bring diapers to Guanica")

    def test_need_past_due_is_invalid(self):
        """Tests a due date that has passed raises error"""
        organizer = create_user(username="testOrganizer")
        organization = create_organization(organizers=[organizer], title="D4C")

        with self.assertRaises(ValidationError):
            need = Need.objects.create(
                organization=organization,
                title="Bring diapers to Guanica",
                due=datetime.today().date() - timedelta(weeks=2),
            )
            need.full_clean()

    def test_need_due_is_valid(self):
        """Tests a due date that has passed raises error"""
        organizer = create_user(username="testOrganizer")
        organization = create_organization(organizers=[organizer], title="D4C")
        need = Need.objects.create(
            organization=organization,
            title="Bring diapers to Guanica",
            due=datetime.today().date() + timedelta(weeks=2),
        )

        self.assertEqual(str(need), "D4C-Bring diapers to Guanica")
