from django.http import HttpResponse
from datetime import datetime
from django.shortcuts import render

def home(request):
    return render(request, "dj_app/home.html")

def products(request):
    return render(request, "dj_app/products.html")

def hello(request, name):
    return render(
        request,
        'dj_app/hello.html',
        {
            'name': name,
            'date': datetime.now()
        }
    )