from datetime import datetime, timedelta

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


from .models import Need, Organization, Match

def create_user(email="test@test.com", password="testPass1212"):
    """Helper function to create new user"""
    return get_user_model().objects.create_user(
        email=email,
        password=password,
    )

def create_organization(organizers, title="Diapers4Change"):
    """Helper to create an organization"""
    org = Organization.objects.create(
        title=title,
        description="super awesome description",
    )
    org.organizers.set(organizers)
    org.save()
    return org

def create_match(need, volunteer):
    """Helper to create a match"""
    return Match.objects.create(
        need=need,
        volunteer=volunteer
    )

def create_need(org, **params):
    """Helper to create a need"""
    defaults = {
        "title": "do good",
        "city": "San Juan",
        "category": "Materials",
    }
    defaults.update(params)

    return Need.objects.create(organization=org, **defaults)


class NeedsModelsTests(TestCase):

    def test_string_need(self):
        """Test string representation of a Need"""
        organizer = create_user()
        organization = create_organization(organizers=[organizer], title="D4C")
        need = create_need(org=organization, title="Bring diapers to Guanica")

        self.assertEqual(str(need), "D4C-Bring diapers to Guanica")

    def test_need_past_due_is_invalid(self):
        """Tests a due date that has passed raises error"""
        organizer = create_user()
        organization = create_organization(organizers=[organizer], title="D4C")

        with self.assertRaises(ValidationError):
            need = create_need(
                org=organization,
                due=datetime.today().date() - timedelta(weeks=2),
            )
            need.full_clean()

    def test_need_due_is_valid(self):
        """Tests a due date that has passed raises error"""
        organizer = create_user()
        organization = create_organization(organizers=[organizer], title="D4C")
        need = create_need(
            org=organization,
            title="Bring diapers to Guanica",
            due=datetime.today().date() + timedelta(weeks=2),
        )

        self.assertEqual(str(need), "D4C-Bring diapers to Guanica")

    def test_string_organization(self):
        """Test string representation of an Organization"""
        organizer = create_user()
        organization = create_organization(organizers=[organizer], title="D4C")

        self.assertEqual(str(organization), "D4C")

    def test_string_match(self):
        """Test string representation of a Match"""
        organizer = create_user()
        organization = create_organization(organizers=[organizer], title="D4C")
        need = create_need(
            org=organization,
            title="Bring diapers",
            due=datetime.today().date() + timedelta(weeks=2),
        )
        volunteer = create_user(email="test2@test.com")
        match = create_match(need, volunteer)

        self.assertEqual(str(match), "test2@test.com-Bring diapers")