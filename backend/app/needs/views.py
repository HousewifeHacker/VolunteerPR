from rest_framework import viewsets, permissions

from .models import Need, Organization, Match
from .serializers import NeedSerializer, MatchSerializer, OrganizationSerializer, NeedSafeSerializer


class IsOrganizer(permissions.BasePermission):
    message = 'Only organizers and staff can perform this action'
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if not bool(request.user and request.user.is_authenticated):
            return False

        if Organization.objects.get(pk=request.data['organization']).organizers.filter(id=request.user.id):
            return True

        return bool(request.user and request.user.is_staff)


class IsAdminDestructiveOnly(permissions.BasePermission):
    message = 'Only Staff can perform this action'
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class MatchViewSet(viewsets.ModelViewSet):
    """View and edit matches for a user"""
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Match.objects.none() #none or all?

    def get_queryset(self):
        """Only return their matches"""
        return Match.objects.filter(volunteer=self.request.user).all()

    def perform_create(self, serializer):
        """Create a match for the user"""
        serializer.save(volunteer=self.request.user)


class NeedViewSet(viewsets.ModelViewSet):
    """View all needs for a normal/volunteer user. Permit any organizers of organization for everything"""
    serializer_class = NeedSerializer
    permission_classes = [IsOrganizer]
    queryset = Need.objects.all()

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return NeedSafeSerializer
        return NeedSerializer

    def get_queryset(self):
        queryset = Need.objects.all()
        type = self.request.query_params.get('type', None)
        org = self.request.query_params.get('org', None)
        if type is not None:
            queryset = queryset.filter(need_type=type)
        if org is not None:
            queryset = queryset.filter(organization__id=org)
        return queryset

    def perform_create(self, serializer):
        """Create a need for the organizer. Allowing many organizations for user"""
        serializer.save(organizer=self.request.user)


class OrganizationViewSet(viewsets.ModelViewSet):
    """View all organizations. Allow nonsafe for staff"""
    serializer_class = OrganizationSerializer
    permission_classes = [IsAdminDestructiveOnly]
    queryset = Organization.objects.all()