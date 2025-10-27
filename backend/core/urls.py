from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_api, name='test_api'),
    path('listings/',views.listings_api, name='listings_api'),
    path('accounts/',views.account_api, name='account_api'),
    path('transactions/',views.transaction_api, name='transaction_api'),
]
