from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from .models import Match, Organization, Need


class PublicMatchesApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_matches(self):
        res = self.client.get(reverse('match-list'))

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateMatchesApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = get_user_model().objects.create_user(
            email='test@test.com',
            password='testPass123'
        )
        self.user2 = get_user_model().objects.create_user(
            email='test2@test.com',
            password='testPass123',
        )
        self.organization = Organization.objects.create(
            title="an org",
            description="lets help",
        )
        self.need = Need.objects.create(
            organization=self.organization,
            title="Bring diapers",
        )

    def test_create_user_match(self):
        self.client.force_authenticate(self.user1)
        payload = {'need': self.need.id}
        res = self.client.post(reverse('match-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Match.objects.filter(
            volunteer=self.user1.id
        ).exists()
        self.assertTrue(exists)

    def test_user_views_own_matches_list(self):
        self.client.force_authenticate(self.user1)
        match1 = Match.objects.create(
            need=self.need,
            volunteer=self.user1
        )
        match2 = Match.objects.create(
            need=self.need,
            volunteer=self.user2
        )
        res = self.client.get(reverse('match-list'))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['count'], 1)