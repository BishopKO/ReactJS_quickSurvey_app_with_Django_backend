from django.urls import path, include
from .views import *
from rest_framework_simplejwt import views as jwt_views

# Todo Create separate classes for create/ edit...

urlpatterns = [
    path('', Index.as_view(), name="index"),
    path('create_survey', CreateSurvey.as_view(), name="create-survey"),
    path('edit_survey', SurveyEdit.as_view(), name="survey-edit"),
    path('surveys_list', SurveysList.as_view(), name="surveys-list"),
    path('user_register', UserRegister.as_view(), name="user-register"),

]

urlpatterns += [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
