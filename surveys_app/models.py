from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
import uuid


class Survey(models.Model):
    active = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    survey_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    survey_title = models.SlugField(default='default')
    date = models.DateTimeField(auto_now_add=True)
    data = models.TextField()

    class Meta:
        verbose_name_plural = "Surveys"

    def __str__(self):
        return self.owner.username + '__' + self.survey_title


class Answers(models.Model):
    survey_id = models.ForeignKey(Survey, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    data = models.TextField()

    class Meta:
        verbose_name_plural = "Answers"

    def __str__(self):
        return str(self.survey_id)
