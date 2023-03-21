from mixer.backend.django import mixer
from django.core.management.base import BaseCommand


from TODO.models import Project, TODO
from users.models import Users


class Command(BaseCommand):
    help = 'Create 5 projects and 5 TODOs'

    def handle(self, *args, **options):
        for i in range(10):
            mixer.blend(Users)
        for i in range(10):
            mixer.blend(Project)
        for i in range(10):
            mixer.blend(TODO)
        print('done')
