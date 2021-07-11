from django.views.generic import TemplateView, View
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from django.core import serializers

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet

from surveys_app.utils.mixins import ExceptionCatchAndJsonResponseMixin
from surveys_app.utils.prepare_results import prepare_text_results, prepare_chart_results

from .models import Survey, Answers
from .serializers import SurveySerializer, AnswersSerializer, PublishedSurveySerializer
import json


# TODO: use viewset
@method_decorator(csrf_exempt, name='dispatch')
class UserRegister(ExceptionCatchAndJsonResponseMixin, View):
    def post(self, request):
        try:
            user_details = json.loads(request.body)
            username, password = user_details.get('username'), user_details.get('password')
            user = User.objects.create(username=username)
            user.set_password(password)
            user.save()
            return JsonResponse({'response': 'SUCCESS'})
        except Exception as e:
            return self.return_exception(e)


class SurveyViewset(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    serializer_class = SurveySerializer

    def get_queryset(self):
        user = User.objects.get(username=self.request.user)
        return Survey.objects.filter(owner=user)


class AnswersViewset(ModelViewSet):
    serializer_class = AnswersSerializer

    def get_queryset(self):
        return Survey.objects.all()


class PublishedSurveyViewset(ReadOnlyModelViewSet):
    serializer_class = PublishedSurveySerializer
    queryset = Survey.objects.all()


class SurveyResultsApiView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request, survey_id):
        user = User.objects.get(username=self.request.user)
        survey = Survey.objects.get(owner=user, survey_id=survey_id)
        answers_queryset = Answers.objects.filter(survey_id__owner=user, survey_id=survey_id)

        text_results = prepare_text_results(json.loads(survey.data), answers_queryset)
        chart_results = prepare_chart_results(json.loads(survey.data), answers_queryset)

        return JsonResponse({'textResults': text_results, 'chartResults': chart_results})
