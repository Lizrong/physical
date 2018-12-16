from django.urls import path
from five_rings.views import *


app_name = 'five_rings'

urlpatterns = [
    path('index/', index, name='index'),
    path('facetSearch/', query, name='query'),

    path('detail/<d_id>/', detail, name='detail'),
    path('savedetail/',save_detail_cart,name='savedetail'),


    path('cart/', cart, name='cart'),
    path('subcart/', sub_to_cart, name='subcart'),
    path('addcart/', add_to_cart, name='addcart'),
    path('deletecart/', delete_cart, name='delcart'),
    path('changeone/', change_cart_select, name='changeone'),
    path('changeall/', change_all_select, name='changeall'),

    path('order/', order_commit, name='order1'),
    path('orderpay/', order_pay, name='order2'),
    path('orderCreate/', order_create),
    path('selectcity/', select_city),
    path('address/', add_address),
    path('deleteaddress/', delete_address),
    path('orderupdate/', order_update),
    path('personinfo/', personinfo),

    path('register/',user_register,name='register'),
    path('checkusername/', check_username, name='check'),
    path('ajaxrequest/',ajax_request,name='ajaxrequest'),
    path('login/',user_login,name="login"),
    path('quit/',quit,name='quit'),

    path('limtime/',limtime,name='limtime'),
    path('adidas/',adidas,name="adidas"),
    path('nike/',nike,name="nick"),
    path('sikaiqi/',sikaiqi,name='sikaiqi'),
    path('kuangwu/',kuangwu,name='kuangwu'),

    path('selectcity/',select_city,name='selectcity'),



]
