import graphene
from graphene_django import DjangoObjectType
from users.models import Users
from TODO.models import Project, TODO


class UsersType(DjangoObjectType):
    class Meta:
        model = Users
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"


class Query(graphene.ObjectType):
    all_users = graphene.List(UsersType)
    all_projects = graphene.List(ProjectType)
    all_TODO = graphene.List(TODOType)

    def resolve_all_users(self, info):
        return Users.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_TODO(self, info):
        return TODO.objects.all()


schema = graphene.Schema(query=Query)
