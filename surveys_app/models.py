from django.contrib.auth.models import User
from django.db import models


class Survey(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    survey_title = models.SlugField(primary_key=True)
    design = models.TextField()

    class Meta:
        verbose_name_plural = "Survey"

    def __str__(self):
        return self.survey_title


class Answers(models.Model):
    survey_id = models.ForeignKey(Survey, on_delete=models.CASCADE)
    data = models.TextField()

    class Meta:
        verbose_name_plural = "Answers"

    def __str__(self):
        return self.survey_id
