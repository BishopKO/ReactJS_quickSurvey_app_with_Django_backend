from django.views.generic import TemplateView, View
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError, DatabaseError
from django.utils.decorators import method_decorator
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.serializers import serialize

from rest_framework.response import Response


class Index(TemplateView):
    template_name = "surveys_app/index.html"


class UserLogout(View):
    def post(self):
        try:
            logout(self.request)
            return JsonResponse({"Logout": "OK"})
        except Exception as e:
            print(e)
            return JsonResponse({"Logout": "FAIL"})


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
        print(json.loads(request.body))
        users = User.objects.all()
        content = serialize('json', users)
        return Response(content)
