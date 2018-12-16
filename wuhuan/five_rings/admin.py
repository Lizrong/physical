from django.contrib import admin
from five_rings.models import *


class ShopAdmin(admin.ModelAdmin):
    list_disply = ['s_name', 's_brand','s_brand','s_page_view','s_history']
    list_filter = ['s_name','s_brand']
    list_per_page = 10
    search_fields = ['s_name']


class GoodsAdmin(admin.ModelAdmin):
    list_display = ['g_name','g_code','g_long_name','g_shoppe','g_price','g_brand','g_style',
                    'g_clasify','g_month_sales','g_page_view']
    list_per_page = 10
    search_fields = ['g_name', 'g_brand']


admin.site.register(Shop,ShopAdmin)
admin.site.register(Goods,GoodsAdmin)


