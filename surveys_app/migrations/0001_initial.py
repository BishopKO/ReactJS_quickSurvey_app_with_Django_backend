# Generated by Django 3.1.7 on 2021-04-21 10:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('active', models.BooleanField(default=False)),
                ('survey_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('survey_title', models.SlugField(default='default')),
                ('date_created', models.DateField(auto_now=True)),
                ('date_edited', models.DateField(auto_now_add=True)),
                ('data', models.TextField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Survey',
            },
        ),
        migrations.CreateModel(
            name='Answers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('data', models.TextField()),
                ('survey_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys_app.survey')),
            ],
            options={
                'verbose_name_plural': 'Answers',
            },
        ),
    ]
