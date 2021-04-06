from django.views.generic import TemplateView, View
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError, DatabaseError
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.serializers import serialize
from .models import Survey

from rest_framework.response import Response


class Index(TemplateView):
    template_name = "surveys_app/index.html"


def create_survey(username, data):
    try:
        survey_title, survey_data, survey_questions = data.get('title'), data.get('data'), data.get('questions')
        user = User.objects.get(username=username)
        surveys_count = Survey.objects.all().count()
        survey_id = '#' + str(surveys_count).zfill(4)
        Survey.objects.create(owner=user, survey_title=survey_title, survey_id=survey_id, data=survey_questions)
    except Exception as e:
        print(e)


@method_decorator(csrf_exempt, name='dispatch')
class UserRegister(View):
    @staticmethod
    def post(request):
        try:
            user_details = json.loads(request.body)
            username, password = user_details.get('username'), user_details.get('password')
            user = User.objects.create(username=username)
            user.set_password(password)
            user.save()
            return JsonResponse({'registration': 'ok'})
        except (IntegrityError, DatabaseError) as e:
            if type(e) == DatabaseError:
                return JsonResponse({'registration': 'DATABASE_ERROR'})
            elif type(e) == IntegrityError:
                return JsonResponse({'registration': 'USERNAME_ALREADY_IN_USE'})


class AjaxGet(APIView):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def post(request):
        json_data = json.loads(request.body)
        api_request = json_data.get('request')
        if api_request == 'CREATE_SURVEY':
            username, data = json_data.get('username'), json_data.get('data')
            create_survey(username, data)
            return Response({'request': 'CREATE_SURVEY_SUCCESS'})

        return Response({'api': 'ok'})
