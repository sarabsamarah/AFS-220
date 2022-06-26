from django.urls import path
from dj_app import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path("", views.home, name="home"),
    path("hello/<name>", views.hello, name="hello"),
    path("products/", views.products, name="products"),
]

urlpatterns += staticfiles_urlpatterns()
