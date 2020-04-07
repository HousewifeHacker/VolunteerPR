from rest_framework import serializers

from .models import Need, Match, Organization


class NeedSerializer(serializers.ModelSerializer):
    """Serializer for Need Model"""

    class Meta:
        model = Need
        fields = "__all__"


class MatchSerializer(serializers.ModelSerializer):
    """Serializer for Match Model"""

    class Meta:
        model = Match
        fields = "__all__"


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer for Organization Model"""

    class Meta:
        model = Organization
        fields = "__all__"
