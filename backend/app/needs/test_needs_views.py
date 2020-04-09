from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from .models import Organization, Need


def sample_org(title='anOrg', description='description', organizers=[]):
    org = Organization.objects.create(
        title=title,
        description=description,
    )
    org.organizers.set(organizers)
    org.save()
    return org

def sample_user(username='testUser', email='test2@test.com', password='testPass123'):
    return get_user_model().objects.create_user(
        username=username,
        email=email,
        password=password,
    )

def sample_superuser(username='testsuper', email='testsuper@test.com', password='testpass123'):
    return get_user_model().objects.create_superuser(
        username=username,
        email=email,
        password=password,
    )

def sample_need(organization, title='Bring diapers'):
    Need.objects.create(
        organization=organization,
        title=title,
    )


class PublicNeedsApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.org = sample_org()

    def test_list_needs(self):
        need = sample_need(self.org, 'do good')
        need = sample_need(self.org, 'volunteer')
        res = self.client.get(reverse('need-list'))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)

    def test_create_need_prevented(self):
        payload = {'organization': self.org.pk, 'title':'save the world'}
        res = self.client.post(reverse('need-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateNeedsApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.superuser = sample_superuser('testSuper', 'testSuper@test.com')
        self.user = sample_user('testVolunteer', 'testVolunteer@test.com')
        self.user_organizer = sample_user('testOrganizer', 'testorganizer@test.com')
        self.org = sample_org(organizers=[self.user_organizer])

    def test_create_need_superuser_success(self):
        self.client.force_authenticate(self.superuser)
        payload = {'organization': self.org.pk, 'title': 'save the world'}
        res = self.client.post(reverse('need-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Need.objects.filter(
            title=payload['title']
        ).exists()
        self.assertTrue(exists)

    def test_create_need_organizer_success(self):
        self.client.force_authenticate(self.user_organizer)
        payload = {'organization': self.org.pk, 'title': 'save the world'}
        res = self.client.post(reverse('need-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Need.objects.filter(
            title=payload['title']
        ).exists()
        self.assertTrue(exists)

    def test_create_need_user_not_allowed(self):
        self.client.force_authenticate(self.user)
        payload = {'organization': self.org.pk, 'title': 'save the world'}
        res = self.client.post(reverse('need-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        exists = Organization.objects.filter(
            title=payload['title']
        ).exists()
        self.assertFalse(exists)
