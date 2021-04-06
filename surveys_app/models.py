from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from datetime import datetime


class Survey(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    survey_id = models.CharField(max_length=5, primary_key=True)
    survey_title = models.SlugField(default='default')
    date = models.DateField(default=timezone.now)
    data = models.TextField()

    class Meta:
        verbose_name_plural = "Survey"

    def __str__(self):
        return self.survey_title


class Answers(models.Model):
    survey_id = models.ForeignKey(Survey, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    data = models.TextField()

    class Meta:
        verbose_name_plural = "Answers"

    def __str__(self):
        return self.survey_id
