from django.db import models
from users.models import Users
from django.forms.widgets import boolean_check


# Create your models here.
class Project(models.Model):
    project_name = models.CharField(max_length=64, unique=True, blank=False)
    project_users = models.ManyToManyField(Users, blank=True)
    project_date_created = models.DateField(auto_now=True)
    project_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return f'{self.project_name}'


class TODO(models.Model):
    note_text = models.CharField(max_length=256, unique=False)
    note_author = models.ForeignKey(Users, on_delete=models.CASCADE, unique=False, blank=False)
    note_daytime_created = models.DateTimeField(auto_now=True)
    note_active = models.BooleanField(default=True)
    note_project = models.ForeignKey(Project, blank=False, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.note_text[:10]}'

    def delete(self, *args):
        self.note_active = False
        self.save()
