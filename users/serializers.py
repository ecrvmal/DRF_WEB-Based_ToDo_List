from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Users


# This module returns object (serialized data)

class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        # fields = '__all__'
        fields = ('username', 'first_name', 'last_name', 'birthday_year', 'email', 'password')


class UsersModelSerializerStaff(ModelSerializer):
    class Meta:
        model = Users
        # fields = '__all__'
        fields = ('username', 'first_name', 'last_name', 'birthday_year', 'is_staff')


class UsersModelSerializerSuperUser(ModelSerializer):
    class Meta:
        model = Users
        # fields = '__all__'
        fields = ('username', 'first_name', 'last_name', 'birthday_year', 'is_superuser')
