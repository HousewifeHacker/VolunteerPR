from rest_framework import viewsets, mixins, authentication, permissions

from .models import Need, Organization, Match
from .serializers import NeedSerializer, MatchSerializer, OrganizationSerializer


class IsOrganizer(permissions.BasePermission):
    message = 'Only organizers can perform this action'
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.organization in request.user.organizations


class IsAdminDestructiveOnly(permissions.BasePermission):
    message = 'Only Staff can perform this action'
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff


class MatchViewSet(viewsets.ModelViewSet):
    """View and edit matches for a user"""
    serializer_class = MatchSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Match.objects.none() #none or all?

    def get_queryset(self):
        """Only return their matches"""
        return self.request.user.matches.all()

    def perform_create(self, serializers):
        """Create a match for the user"""
        serializer.save(volunteer=self.request.user)


class NeedViewSet(viewsets.ModelViewSet):
    """View all needs for a normal/volunteer user. Permit any organizers of organization for everything"""
    serializer_class = NeedSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsOrganizer|permissions.IsAdminUser]
    queryset = Need.objects.all()

    def perform_create(self, serializers):
        """Create a need for the organizer. Allowing many organizations for user"""
        serializer.save(organizer=self.request.user)


class OrganizationViewSet(viewsets.ModelViewSet):
    """View all organizations. Allow nonsafe for staff"""
    serializer_class = OrganizationSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAdminDestructiveOnly]
    queryset = Organization.objects.all()