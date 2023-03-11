"""TodoList URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework.routers import DefaultRouter  # this helps to define entry points
# from users.views import UsersCustomViewSet
from users.views import UsersModelViewSet, UsersListAPIView
from TODO.views import ProjectCustomViewSet, TODOCustomViewSet
from TODO.views import ProjectModelViewSet, TODOModelViewSet
from rest_framework.authtoken import views

# from TODO.views import TODODjangoFilterViewSet

router = DefaultRouter()  # initiate the class

# register entry point to model
# entry point = users , that we had imported
router.register('users', UsersModelViewSet, basename='UserList')
router.register('projects', ProjectModelViewSet, basename='ProjectList')
router.register('TODO', TODOModelViewSet, basename='TODO_List')
# router.register('books', UserModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),  # connect  path = api/    router
    path('api-token-auth/', views.obtain_auth_token),
    re_path(r'^api/(?P<version>\d\.\d)/users/$', UsersListAPIView.as_view()),
]
