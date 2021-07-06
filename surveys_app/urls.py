from django.urls import path, include
from .views import *
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/survey', SurveyViewset, basename="survey")
router.register(r'api/answers', AnswersViewset, basename="answers")
router.register(r'api/published', PublishedSurveyViewset, basename="published")

urlpatterns = [
    path('', include(router.urls))
]

urlpatterns += [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
]
