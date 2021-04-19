from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.test import Client

urls_names = {'tokens': 'token_obtain_pair', 'create': 'create-survey', 'list': 'surveys-list',
              'register': 'user-register'}


class TestApi(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user',
                                             password='test_password')

        self.client = Client()
        url = reverse(urls_names.get('tokens'))
        resp = self.client.post(url, data={'username': 'test_user', 'password': 'test_password'})
        self.access, self.refresh = resp.data.get('access'), resp.data.get('refresh')

    def test_get_api_tokens(self):
        self.assertIsNot(self.access, None)
        self.assertIsNot(self.refresh, None)

    def test_create_surveys(self):
        url = reverse(urls_names.get('create'))
        answers = [f'answer_{x}' for x in range(5)]
        headers = {'Authorization': f'Bearer {self.access}'}
        self.client.post(url, headers=headers, data={'title': 'test_title', 'data': answers})
