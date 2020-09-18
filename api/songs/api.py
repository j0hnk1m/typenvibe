from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Song
from .serializers import SongSerializer


class SongViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SongSerializer
    queryset = Song.objects.all()
