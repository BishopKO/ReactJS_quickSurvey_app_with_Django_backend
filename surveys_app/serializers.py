from rest_framework import serializers
from django.contrib.auth.models import User

class UsersSerializer(serializers.ModelSerializer):
    model = User
    fields = ('username',)