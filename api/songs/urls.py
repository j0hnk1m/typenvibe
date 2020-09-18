from rest_framework import routers
from .api import SongViewSet

router = routers.DefaultRouter()
router.register('songs', SongViewSet, 'songs')
urlpatterns = router.urls
