from django.test import TestCase
import math

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from users.views import UsersModelViewSet
from users.models import Users
from TODO.models import Project


# Create your tests here.


class TestUserViewSet1(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin_123@yandex.ru'
        self.birthday_year = 1965

        self.data = {'username': 'Vlad', 'first_name': 'Vladimir', 'last_name': 'Ivanov', 'password': 'mypassword',
                     "birthday_year": 1965, 'email': 'vlad@rambler.ru'}
        self.data_put = {'username': 'Maria', 'first_name': 'Maria', 'last_name': 'Ivanova', 'password': 'mypassword',
                         "birthday_year": 1973, 'email': 'ma@rambler.ru'}

        self.url = '/api/users'
        User = get_user_model()
        self.admin = User.objects.create_superuser(username=self.name,
                                                   password=self.password,
                                                   birthday_year=self.birthday_year,
                                                   email=self.email)

    # testing API VIEW AuthorModelViewSet
    def test_get_list(self):
        factory = APIRequestFactory()  # создали объект
        request = factory.get(self.url)  # создали тип запроса factory направляем запрос
        view = UsersModelViewSet.as_view({'get': 'list'})  # as_view  - from url   б передаем методы туда
        #  не отправляем реальный запрос на сервер, а эмултруем похожий запрос,
        # и передаем его в API VIEW
        #     view = AuthorModelViewSet.as_view({'post': 'create'})
        #     view = AuthorModelViewSet.as_view({'delete': 'destroy'})
        #     view = AuthorModelViewSet.as_view({'update': 'post'})
        # print('test1 view', view)
        response = view(request)
        # print('test1 response', response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    #        Authorization test
    def test_create_guest(self):
        factory = APIRequestFactory()  # создали объект
        request = factory.post(self.url, self.data, format='json')  # создали тип запроса factory направляе
        view = UsersModelViewSet.as_view({'post': 'create'})  # as_view  - from url   б передаем методы туда
        response = view(request)
        # print('test2 response', response)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):  # test with admin rights: create user
        factory = APIRequestFactory()  # создали объект
        request = factory.post(self.url, self.data, format='json')  # создали тип запроса factory направляе
        # print('test3 view', request)
        force_authenticate(request, self.admin)  # user authorization
        view = UsersModelViewSet.as_view({'post': 'create'})  # as_view  - from url   б передаем методы туда
        print('test3 view', view)
        response = view(request)
        print('test3 response', response)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def tearDown(self) -> None:
        pass


class TestUserViewSetAPI(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin_123@yandex.ru'
        self.birthday_year = 1965

        self.data = {'username': 'Vlad', 'first_name': 'Vladimir', 'last_name': 'Ivanov', 'password': 'mypassword',
                     "birthday_year": 1965, 'email': 'vlad@rambler.ru'}
        self.data_put = {'username': 'Maria', 'first_name': 'Maria', 'last_name': 'Ivanova',
                         'password': 'mypassword',
                         "birthday_year": 1973, 'email': 'ma@rambler.ru'}

        self.url = '/api/users'
        User = get_user_model()
        self.admin = User.objects.create_superuser(username=self.name,
                                                   password=self.password,
                                                   birthday_year=self.birthday_year,
                                                   email=self.email)

    def test_create_guest_api(self):
        client = APIClient()  # права не нужны, запускаем с API консоли
        User = get_user_model()
        user = User.objects.create(**self.data)
        response = client.put(f'{self.url}/{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin_api(self):
        client = APIClient()  # права не нужны, запускаем с API консоли
        User = get_user_model()
        user = User.objects.create(**self.data)
        client.login(username=self.name, password=self.password)
        response = client.put(f'{self.url}/{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        auth = User.objects.get(id=user.id)
        self.assertEqual(auth.first_name, 'Maria')
        self.assertEqual(auth.last_name, 'Ivanova')
        self.assertEqual(auth.birthday_year, 1973)
        client.logout()

    def tearDown(self) -> None:
        pass


class TestProjectsViewSet(APITestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin_123@yandex.ru'
        self.birthday_year = 1965

        self.data_user = {'username': 'Vlad', 'first_name': 'Vladimir', 'last_name': 'Ivanov', 'password': 'mypassword',
                          "birthday_year": 1965, 'email': 'vlad@rambler.ru'}
        self.data = {'project_name': 'Test_Project_Name',

                     # 'project_users': [],

                     'project_date_created': "2023-02-14", 'project_url': 'http://www.project.com'}
        self.data_put = {'project_name': 'Test_Project_Name2',
                         'project_date_created': "2023-03-01", 'project_url': 'http://www.project.ru'}

        self.url = '/api/projects/'
        User = get_user_model()
        self.admin = User.objects.create_superuser(username=self.name,
                                                   password=self.password,
                                                   birthday_year=self.birthday_year,
                                                   email=self.email)

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_admin(self):
        self.client.login(username=self.name, password=self.password)  # authorization as admin
        proj = Project.objects.create(**self.data)
        # response = proj.get()
        # print('response', response)
        # print('proj', proj)
        User = get_user_model()
        user = User.objects.create(**self.data_user)
        # print('user', user)
        # users = User.objects.filter(True)
        proj.project_users.set([user])
        response = self.client.put(f'{self.url}{proj.id}/',
                                   {'project_name': 'Test_Project_Name2', 'project_url': ''})

        # response = self.client.put(f'{self.url}{bio.id}/', self.data_put)          this doesn't work
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        proj_ = Project.objects.get(id=proj.id)
        self.assertEqual(proj_.project_name, 'Test_Project_Name2')
        self.client.logout()

    def test_put_mixer(self):
        proj = mixer.blend(Project)  # mixer will create the object with all params with links
        self.client.login(username=self.name, password=self.password)  # authorization as admin
        response = self.client.put(f'{self.url}{proj.id}/',
                                   {'project_name': 'Test_Project_Name2', 'project_url': 'http://www.project.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        proj_ = Project.objects.get(id=proj.id)
        self.assertEqual(proj_.project_name, 'Test_Project_Name2')
        self.client.logout()

        def tearDown(self) -> None:
            pass
