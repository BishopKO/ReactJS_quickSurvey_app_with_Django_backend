from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from surveys_app.models import Survey, Answers


class TestUserModel(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')

    def test_create_password(self):
        self.user.set_password('test_password')
        self.user.save()
        get_user = User.objects.get(username='test_user')
        self.assertEqual(get_user.username, 'test_user')


class TestSurveysModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user')
        self.survey = Survey.objects.create(owner=self.user, data={'test_data': 'data'})

    def test_get_data(self):
        survey = Survey.objects.get(survey_id=self.survey.survey_id)
        self.assertEqual(survey.data, str({'test_data': 'data'}))


class TestAnswersModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user')
        self.survey = Survey.objects.create(owner=self.user, data={'test_data': 'data'})
        self.answers = Answers.objects.create(survey_id=self.survey,
                                              data=['answer_1', 'answer_2', 'answer_3'])

    def test_get_answers(self):
        self.assertEqual(self.answers.data, ['answer_1', 'answer_2', 'answer_3'])
