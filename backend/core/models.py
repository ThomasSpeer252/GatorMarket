from django.db import models

# Create your models here.


class Listing(models.Model): #class for listing DB
    listing_number = models.IntegerField(primary_key=True) #each line here in the beginning is a field in the table, primary_key=True sets it as the primary key
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=128)
    date_created = models.DateField()
    price = models.IntegerField()
    image_location = models.CharField(max_length=512)
    category = models.CharField(max_length=20)
    original_poster = models.CharField(max_length=128)


    class Meta:
        db_table = 'listing'
        managed = False # this line prevents django from messing with the table

class Account(models.Model):
    account_number = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=128)
    password = models.CharField(max_length=128)
    email = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=20)
    rating = models.IntegerField()
    isseller = models.BooleanField()
    isadmin = models.BooleanField()

    class Meta:
        db_table = 'account'
        managed = False # this line prevents django from messing with the table
        
class Transaction(models.Model):
    transaction_id = models.IntegerField(primary_key=True)
    lister_username = models.CharField(max_length=128)
    buyer_username = models.CharField(max_length=128)
    date_closed = models.DateField()

    class Meta:
        db_table = 'transactions'
        managed = False # this line prevents django from messing with the table
