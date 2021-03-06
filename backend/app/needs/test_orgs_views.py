from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from .models import Organization


class PublicOrgsApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_orgs(self):
        Organization.objects.create(
            title='anOrg',
            description='description',
        )
        res = self.client.get(reverse('organization-list'))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['count'], 1)

    def test_create_org_prevented(self):
        payload = {'title': 'testOrg', 'description': 'testing description'}
        res = self.client.post(reverse('organization-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateOrgsApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.superuser = get_user_model().objects.create_superuser(
            email='test@test.com',
            password='testPass123'
        )
        self.user = get_user_model().objects.create_user(
            email='test2@test.com',
            password='testPass123',
        )

    def test_create_org_superuser_success(self):
        self.client.force_authenticate(self.superuser)
        payload = {'title': 'testOrg', 'description': 'testing description'}
        res = self.client.post(reverse('organization-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Organization.objects.filter(
            title=payload['title']
        ).exists()
        self.assertTrue(exists)

    def test_create_org_user_not_allowed(self):
        self.client.force_authenticate(self.user)
        payload = {'title': 'testOrg', 'description': 'testing description'}
        res = self.client.post(reverse('organization-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        exists = Organization.objects.filter(
            title=payload['title']
        ).exists()
        self.assertFalse(exists)

    def test_superuser_edit_put(self):
        self.client.force_authenticate(self.superuser)
        post_payload = {'title': 'testOrg', 'description': 'testing description'}
        res = self.client.post(reverse('organization-list'), post_payload)
        org = Organization.objects.filter(
            title=post_payload['title']
        )[0]

        payload = {'title': 'new', 'description': 'doing good'}
        res = self.client.put(
            reverse('organization-detail', kwargs={'pk': str(org.id)}),
            data=payload,
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        org.refresh_from_db()
        self.assertEqual(org.title, "new")

    def test_superuser_patch_organizers(self):
        self.client.force_authenticate(self.superuser)
        org = Organization.objects.create(
            title='anOrg',
            description='description',
        )
        payload = {'organizers': [self.user.pk]}
        res = self.client.patch(
            reverse('organization-detail', kwargs={'pk': str(org.id)}),
            data=payload,
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        org.refresh_from_db()
        organizers = org.organizers.all()
        self.assertEqual(len(organizers), 1)
        self.assertIn(self.user, organizers)
