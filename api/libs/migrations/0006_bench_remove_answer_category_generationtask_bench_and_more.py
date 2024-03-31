# Generated by Django 5.0.1 on 2024-03-31 14:32

import django.contrib.postgres.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('libs', '0005_generationsetting'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bench',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=512, unique=True)),
                ('description', models.TextField(blank=True, max_length=1024, null=True)),
            ],
            options={
                'verbose_name': '評価ベンチ',
                'verbose_name_plural': '評価ベンチ',
                'db_table': 'benches',
            },
        ),
        migrations.RemoveField(
            model_name='answer',
            name='category',
        ),
        migrations.AddField(
            model_name='generationtask',
            name='bench',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='generation_tasks', to='libs.bench'),
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('question_number', models.IntegerField()),
                ('category', models.CharField(max_length=256)),
                ('turns', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=4096), size=None)),
                ('bench', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='libs.bench')),
            ],
            options={
                'verbose_name': '質問',
                'verbose_name_plural': '質問',
                'db_table': 'questions',
            },
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='libs.question'),
        ),
    ]
