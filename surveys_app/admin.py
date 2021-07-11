from django.contrib import admin
from surveys_app.models import *


class SurveyAdmin(admin.ModelAdmin):
    list_display = ('survey_title', 'survey_id')


admin.site.register(Survey, SurveyAdmin)
admin.site.register(Answers)
