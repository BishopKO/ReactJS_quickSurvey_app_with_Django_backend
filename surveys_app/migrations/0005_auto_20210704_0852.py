# Generated by Django 3.1.7 on 2021-07-04 07:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('surveys_app', '0004_auto_20210627_1201'),
    ]

    operations = [
        migrations.RenameField(
            model_name='survey',
            old_name='active',
            new_name='isActive',
        ),
    ]
