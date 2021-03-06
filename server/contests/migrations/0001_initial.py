# Generated by Django 2.1.7 on 2019-03-24 13:46

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import re


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(4), django.core.validators.MaxLengthValidator(255)])),
                ('shortId', models.CharField(max_length=255, unique=True, validators=[django.core.validators.RegexValidator(re.compile('^[-a-zA-Z0-9_]+\\Z'), "Enter a valid 'slug' consisting of letters, numbers, underscores or hyphens.", 'invalid'), django.core.validators.MinLengthValidator(4), django.core.validators.MaxLengthValidator(255)])),
                ('shortDescription', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(4), django.core.validators.MaxLengthValidator(255)])),
                ('description', models.TextField(validators=[django.core.validators.MaxLengthValidator(4194304)])),
                ('startTime', models.DateTimeField()),
                ('freezed', models.BooleanField()),
                ('finishTime', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('extensions', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Permission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=32, unique=True)),
                ('description', models.TextField(validators=[django.core.validators.MaxLengthValidator(1024)])),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(4), django.core.validators.MaxLengthValidator(255)], verbose_name='name')),
                ('username', models.CharField(max_length=64, validators=[django.core.validators.RegexValidator(re.compile('^[-a-zA-Z0-9_]+\\Z'), "Enter a valid 'slug' consisting of letters, numbers, underscores or hyphens.", 'invalid'), django.core.validators.MinLengthValidator(4), django.core.validators.MaxLengthValidator(64)], verbose_name='username')),
                ('email', models.EmailField(max_length=255, validators=[django.core.validators.EmailValidator(), django.core.validators.MinLengthValidator(4), django.core.validators.MaxLengthValidator(255)], verbose_name='email')),
                ('password', models.CharField(max_length=255)),
                ('signup_otc', models.CharField(max_length=32)),
                ('reset_password_otc', models.CharField(max_length=32)),
                ('contest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='members', to='contests.Contest')),
                ('permissions', models.ManyToManyField(to='contests.Permission')),
            ],
        ),
        migrations.AddField(
            model_name='contest',
            name='permittedLanguages',
            field=models.ManyToManyField(to='contests.Language'),
        ),
    ]
