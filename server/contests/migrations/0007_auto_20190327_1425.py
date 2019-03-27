# Generated by Django 2.1.7 on 2019-03-27 14:25

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('contests', '0006_auto_20190327_0826'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='submission',
            name='source_code',
        ),
        migrations.AddField(
            model_name='submission',
            name='issued_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]