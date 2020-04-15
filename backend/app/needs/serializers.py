from rest_framework import serializers

from .models import Need, Match, Organization


class MatchSerializer(serializers.ModelSerializer):
    """Serializer for Match Model"""

    class Meta:
        model = Match
        fields = ('id', 'need')
        read_only_fields = ('id',)


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer for Organization Model"""

    class Meta:
        model = Organization
        fields = "__all__"


class OrganizationDisplaySerializer(serializers.ModelSerializer):
    """Serializer for read only organization info"""

    class Meta:
        model = Organization
        fields = ("id", "title")
        read_only_fields = ("title",)


class NeedSerializer(serializers.ModelSerializer):
    """Serializer for Need Model"""

    class Meta:
        model = Need
        fields = "__all__"


class NeedSafeSerializer(serializers.ModelSerializer):
    """Serializer for GET Need Model"""
    organization = OrganizationDisplaySerializer(many=False)

    class Meta:
        model = Need
        fields = "__all__"