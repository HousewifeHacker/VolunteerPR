from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from .models import Organization, Need
from .helpers import NEED_TYPE_CHOICES


def sample_org(title='anOrg', description='description', organizers=[]):
    org = Organization.objects.create(
        title=title,
        description=description,
    )
    org.organizers.set(organizers)
    org.save()
    return org

def sample_user(email='test2@test.com', password='testPass123'):
    return get_user_model().objects.create_user(
        email=email,
        password=password,
    )

def sample_superuser(email='testsuper@test.com', password='testpass123'):
    return get_user_model().objects.create_superuser(
        email=email,
        password=password,
    )

def sample_need(org, **params):
     defaults = {
         "title": "Bring Diapers",
         "city": "San Juan",
         "category": "Materials",
         "need_type": NEED_TYPE_CHOICES[0][0],
     }
     defaults.update(params)

     return Need.objects.create(organization=org, **defaults)


class PublicNeedsApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.org = sample_org()

    def test_list_needs(self):
        sample_need(self.org, need_type=NEED_TYPE_CHOICES[0][0])
        sample_need(self.org, need_type=NEED_TYPE_CHOICES[1][0])
        res = self.client.get(reverse('need-list'))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['count'], 2)

    def test_filter_need_type(self):
        sample_need(self.org, need_type=NEED_TYPE_CHOICES[0][0])
        sample_need(self.org, need_type=NEED_TYPE_CHOICES[1][0])
        route = "{}?{}={}".format(
            reverse('need-list'),
            'type',
            NEED_TYPE_CHOICES[0][0]
        )
        res = self.client.get(route)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['count'], 1)

    def test_filter_need_org(self):
        sample_need(self.org)
        def get_route(orgId):
            return "{}?{}={}".format(
                reverse('need-list'),
                'org',
                orgId
            )

        invalid = "241a34f9-0d29-42f3-aa3e-e90234b9a1fd"
        res = self.client.get(get_route(invalid))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['count'], 0)

        res = self.client.get(get_route(self.org.id))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['count'], 1)

    def test_create_need_prevented(self):
        payload = {'organization': self.org.pk, 'title':'save the world'}
        res = self.client.post(reverse('need-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateNeedsApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.superuser = sample_superuser('testSuper@test.com')
        self.user = sample_user('testVolunteer@test.com')
        self.user_organizer = sample_user('testorganizer@test.com')
        self.org = sample_org(organizers=[self.user_organizer])

    def test_create_need_superuser_success(self):
        self.client.force_authenticate(self.superuser)
        payload = {
            'organization': self.org.pk,
            'title': 'save the world',
            'city': 'San Juan',
            'category': 'Materials',
        }
        res = self.client.post(reverse('need-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Need.objects.filter(
            title=payload['title']
        ).exists()
        self.assertTrue(exists)

    def test_create_need_organizer_success(self):
        self.client.force_authenticate(self.user_organizer)
        payload = {
            'organization': self.org.pk,
            'title': 'save the world',
            'city': 'San Juan',
            'category': 'Materials',
        }
        res = self.client.post(reverse('need-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Need.objects.filter(
            title=payload['title']
        ).exists()
        self.assertTrue(exists)

    def test_create_need_user_not_allowed(self):
        self.client.force_authenticate(self.user)
        payload = {
            'organization': self.org.pk,
            'title': 'save the world',
            'city': 'San Juan',
            'category': 'Materials',
        }
        res = self.client.post(reverse('need-list'), payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        exists = Organization.objects.filter(
            title=payload['title']
        ).exists()
        self.assertFalse(exists)
