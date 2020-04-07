# Generated by Django 2.2.12 on 2020-04-07 19:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('needs', '0003_auto_20200405_2127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='organizers',
            field=models.ManyToManyField(blank=True, null=True, related_name='organizers', to=settings.AUTH_USER_MODEL),
        ),
    ]
