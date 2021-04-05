from django.urls import path, include
from .views import *
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', Index.as_view(), name="index"),
    path('ajax_get', AjaxGet.as_view(), name="ajax-get"),
    path('user_logout', UserLogout.as_view(), name="user-logout"),
    path('user_register', UserRegister.as_view(), name="user-register"),

]

# urlpatterns += [
#     path('accounts/', include('django.contrib.auth.urls')),
# ]

urlpatterns += [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
