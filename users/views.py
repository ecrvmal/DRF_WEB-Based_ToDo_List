# from django.shortcuts import render
from rest_framework import generics
# from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
# from rest_framework import mixins
from .models import Users
from .serializers import UsersModelSerializer, UsersModelSerializerStaff, UsersModelSerializerSuperUser


# from rest_framework import viewsets
# from rest_framework.permissions import IsAdminUser, BasePermission


# mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin,
#                            mixins.UpdateModelMixin, viewsets.GenericViewSet)

# class UsersCustomViewSet(mixins.CreateModelMixin,
#                          mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin,
#                          mixins.UpdateModelMixin, viewsets.GenericViewSet):
#     queryset = Users.objects.all()
#     serializer_class = UsersModelSerializer


# class UsersCustomViewSet(viewsets.ModelViewSet):
#     queryset = Users.objects.all()
#     serializer_class = UsersModelSerializer

class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer

    def get_serializer_class(self):
        print(self.request.query_params)
        version = self.request.query_params.get('version')
        if version == '1.0':
            print('goes to Serializer')
            return UsersModelSerializerStaff
        if version == '2.0':
            print('goes to Serializer')
            return UsersModelSerializerSuperUser
        print('goes to SerializerBase')
        return UsersModelSerializer


class UsersListAPIView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.1':
            return UsersModelSerializerStaff
        if self.request.version == '0.2':
            return UsersModelSerializerSuperUser
        return UsersModelSerializer
