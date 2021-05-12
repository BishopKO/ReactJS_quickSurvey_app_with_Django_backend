from django.views.generic import TemplateView, View
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
import json
import jwt
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.backends import TokenBackend

from django.core.serializers import serialize
from .models import Survey
from rest_framework.response import Response

from surveys_app.utils.mixins import ExceptionCatchAndJsonResponseMixin


# TODO: ADD MIXINS TO GET USER ID FROM TOKEN
class Index(TemplateView):
    template_name = "surveys_app/index.html"


@method_decorator(csrf_exempt, name='dispatch')
class UserRegister(View, ExceptionCatchAndJsonResponseMixin):
    @staticmethod
    def post(request):
        try:
            user_details = json.loads(request.body)
            username, password = user_details.get('username'), user_details.get('password')
            user = User.objects.create(username=username)
            user.set_password(password)
            user.save()
            return JsonResponse({'registration': 'SUCCESS'})
        except Exception as e:
            return ExceptionCatchAndJsonResponseMixin.return_exception(e)


class CreateSurvey(APIView, ExceptionCatchAndJsonResponseMixin):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def post(request):
        json_data = json.loads(request.body)

        try:
            token = request.headers['Authorization'].split(' ')[1]
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token.get('user_id')

            data = json_data.get('data')
            survey_title, survey_data, survey_questions = data.get('title'), data.get('data'), data.get('questions')
            user = User.objects.get(id=user_id)
            Survey.objects.create(owner=user, survey_title=survey_title, data=json.dumps(survey_questions))
            response = {'create_survey': 'SUCCESS'}
            return JsonResponse(response)
        except Exception as e:
            print(e)
            return ExceptionCatchAndJsonResponseMixin.return_exception(e)


class SurveysList(APIView, ExceptionCatchAndJsonResponseMixin):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def post(request):
        token = request.headers['Authorization'].split(' ')[1]
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

        data = json.loads(request.body)
        order = data.get('order')
        try:
            user = User.objects.get(id=decoded_token.get('user_id'))
            surveys = Survey.objects.filter(owner=user).all().order_by(order)

            response = []

            for survey in surveys:
                response.append({'id': survey.survey_id, 'active': survey.active, 'title': survey.survey_title,
                                 'date': survey.date})

            return Response(response)
        except Exception as e:
            print(e)
            return ExceptionCatchAndJsonResponseMixin.return_exception(e)


class SurveyEdit(APIView):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def post(request):
        token = request.headers['Authorization'].split(' ')[1]
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token.get('user_id')
        user = User.objects.get(id=user_id)
        api_request = json.loads(request.body)
        request_type, survey_id = api_request.get('request'), api_request.get('survey_id')

        if request_type == 'SET_ACTIVE':
            survey = Survey.objects.get(owner=user, survey_id=survey_id)
            survey.active = not survey.active
            survey.save()
            response = {'set_active': 'SUCCESS'}
            return JsonResponse(response)

        elif request_type == 'GET_SURVEY_DATA':
            survey = Survey.objects.get(owner=user, survey_id=survey_id)
            survey_id, survey_title, survey_data = survey.survey_id, survey.survey_title, survey.data

            return JsonResponse(
                {'title': survey_title, 'id': survey_id, 'questions': json.loads(survey_data)})

        elif request_type == 'SAVE_SURVEY':
            json_data = json.loads(request.body).get('data')
            questions, title = json_data.get('questions'), json_data.get('title')
            survey = Survey.objects.get(owner=user_id, survey_id=survey_id)
            survey.data = json.dumps(questions)
            survey.survey_title = title
            survey.save()
            # TODO: ADD RESPONSE
            return JsonResponse({'save': 'ok'})

        elif request_type == 'DELETE_SURVEY':
            print(user_id, survey_id)
            survey = Survey.objects.get(owner=user, survey_id=survey_id)
            survey.delete()
            return JsonResponse({'delete_survey': 'SUCCESS'})


        else:
            return JsonResponse({})
