from rest_framework import serializers
from surveys_app.models import Survey, Answers


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ('survey_id', 'survey_title', 'data', 'isActive', 'date', 'owner')


class AnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ('survey_id', 'data')


class PublishedSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ('survey_title', 'data', 'owner', 'isActive',)
