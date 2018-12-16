import datetime
from django.db import models


import datetime
from django.db import models


# 用户类：
class UserInfo(models.Model):
    # 用户名
    u_name = models.CharField(max_length=30,unique=True)
    # 密码
    u_pwd = models.CharField(max_length=40)
    # 确认密码
    u_confirm_pwd=models.CharField(max_length=40)
    #手机号
    u_phone=models.CharField(max_length=20)


    def __str__(self):
        return self.u_name

    class Meta:
        verbose_name='用户表'
        verbose_name_plural=verbose_name
        db_table = 'user_info'


# 店铺表
class Shop(models.Model):
    # 店铺名称
    s_name = models.CharField(max_length=50, null=False)
    # 品牌
    s_brand = models.CharField(max_length=30)
    # 浏览量
    s_page_view = models.IntegerField(default=0)
    # 收藏量
    s_collection = models.IntegerField(default=0)
    # 推荐数
    c_praise = models.IntegerField(default=0)
    # 品牌故事
    s_history = models.TextField()

    def __str__(self):
        return self.s_name

    class Meta:
        verbose_name='店铺表'
        verbose_name_plural=verbose_name
        db_table = 'shop'


# 商品表
class Goods(models.Model):
    # 商品编号
    g_code = models.CharField(max_length=20,verbose_name='商品编号')
    # 商品名称
    g_name = models.CharField(max_length=100, null=False,verbose_name='商品名称')
    # 商品详细名称
    g_long_name = models.CharField(max_length=200, null=False,verbose_name='商品详细名称')
    # 专柜价格
    g_shoppe = models.DecimalField(max_digits=6, decimal_places=2,verbose_name='专柜价格')
    # 五环价
    g_price = models.DecimalField(max_digits=6, decimal_places=2,verbose_name='五环价')
    # 品牌
    g_brand = models.CharField(max_length=50,verbose_name='品牌')
    # 款式
    g_style = models.CharField(max_length=6,verbose_name='款式')
    # #分类
    g_clasify=models.CharField(max_length=300,verbose_name='分类')
    # 图片
    g_thumbail = models.CharField(max_length=100,verbose_name='图片')
    # 当月已销量
    g_month_sales = models.IntegerField(default=0,verbose_name='当月销售量')
    # 浏览量
    g_page_view = models.IntegerField(default=0,verbose_name='浏览量')
    # 进货时间
    g_stoke_datetime = models.DateTimeField(auto_now_add=True,verbose_name='进货时间')
    # 上架时间
    g_grounding = models.DateTimeField(verbose_name='上架时间')
    # 是否删除
    g_isdel = models.BooleanField(default=False)
    # 外键关联店铺(多对一)
    g_info = models.ForeignKey(Shop, on_delete=models.CASCADE,verbose_name='店铺')

    def __str__(self):
        return self.g_name

    class Meta:
        verbose_name='商品表'
        verbose_name_plural=verbose_name
        db_table = 'goods'


# 商品信息表
class CommodityInfo(models.Model):
    # 商品尺码
    ci_size = models.CharField(max_length=10, null=False)
    # 商品颜色
    ci_color = models.CharField(max_length=20, null=False)
    # 库存量
    ci_inventory = models.IntegerField()
    # 外键关联商品(一个商品对应一个商品信息)
    c_goods = models.ForeignKey(Goods, on_delete=models.CASCADE)

    def __str__(self):
        return self.ci_color

    class Meta:
        verbose_name='商品信息表'
        verbose_name_plural=verbose_name
        db_table = 'commodity_info'


# 商品展示表
class ShowInfo(models.Model):
    # 示例1
    si_one = models.CharField(max_length=100)
    # 示例2
    si_two = models.CharField(max_length=100)
    # 示例3
    si_three = models.CharField(max_length=100)
    # 示例4
    si_four = models.CharField(max_length=100)
    # 示例5
    si_five = models.CharField(max_length=100)
    # 其他
    si_other = models.TextField()
    # 外键关联
    si_goods = models.ForeignKey(Goods, on_delete=models.CASCADE)

    def __str__(self):
        return self.si_one

    class Meta:
        verbose_name='商品展示表'
        verbose_name_plural=verbose_name
        db_table = 'show_info'


# 评论信息
class Comment(models.Model):
    # 用户
    c_user = models.CharField(max_length=30)
    # 描述相符度
    c_coincidence_level = models.IntegerField()
    # 服务态度
    c_server_level = models.IntegerField()
    # 发货速度
    c_deilvery_level = models.IntegerField()
    # 个人评论
    c_idea = models.CharField(max_length=300)
    # 颜色
    c_color = models.CharField(max_length=20)
    # 尺码
    c_size = models.CharField(max_length=10)
    # 时间
    c_datetime = models.DateTimeField(auto_now_add=True)
    # 示例1
    c_example = models.CharField(max_length=600)
    # 浏览量
    c_page_view = models.IntegerField(default=0)
    # 点赞
    c_praise = models.IntegerField(default=0)
    # 是否匿名
    c_anonymous = models.BooleanField(default=False)
    # 关联上级
    c_relation = models.ForeignKey('Comment', on_delete=models.CASCADE)
    # 外建关联
    c_goods = models.ForeignKey(Goods, on_delete=models.CASCADE)

    def __str__(self):
        return self.c_user

    class Meta:
        verbose_name='评论信息表'
        verbose_name_plural=verbose_name
        db_table = 'comment'



class ShopFavourable(models.Model):
    '''
    店铺优惠卷
	描述名称（sf_name)  varchar
	条件    (sf_condtiCon)  int
	优惠金额	    (sf_price)  int
	数量        （sf_num)   int
	创建时间     (sf_establish) datetime
	活动开始时间  (sf_activity_start) datatime
	活动结束时间  (sf_activity_stop)  datatime
	领取方式（自定义方式类型）(sf_type) int
	外键关联：店铺（id）  (sf_shop)  int
    '''

    sf_name = models.CharField(max_length=100, null=False)
    sf_condtion = models.IntegerField(null=False)
    sf_price = models.IntegerField(null=False)
    sf_num = models.IntegerField(null=False)
    sf_establish = models.DateTimeField(auto_now_add=True)
    sf_activity_start = models.DateTimeField(default=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    sf_activity_stop = models.DateTimeField()
    sf_type = models.IntegerField()
    sf_shop = models.ForeignKey(Shop, on_delete=models.CASCADE)

    def __str(self):
        return self.sf_name

    class Meta:
        verbose_name='店铺优惠券表'
        verbose_name_plural=verbose_name
        db_table = 'shop_favourable'


class Cart(models.Model):
    '''
    购物车：  (Cart)
    id  int
    数量   (c_number)  int
    优惠   (c_price)  int
    选中状态 (c_state)  boolean
    添加时间 (c_add_datetime)  datetime
    是否删除 (c_isdel)  boolean
    关联外键：
        用户（id） (c_user)  int
        商品（id） (c_goods)  int
    '''
    c_number = models.IntegerField()
    c_color = models.CharField(max_length=20)
    c_size=models.CharField(max_length=10)
    c_price = models.IntegerField()
    c_state = models.BooleanField(default=True)
    c_add_datetime = models.DateTimeField(auto_now_add=True)
    c_isdel = models.BooleanField(default=False)
    c_user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    c_goods = models.ForeignKey(Goods, on_delete=models.CASCADE)

    class Meta:
        verbose_name='购物车'
        verbose_name_plural=verbose_name
        db_table = 'cart'


class UserFavourable(models.Model):
    '''
    用户优惠卷：(UserFavourable)
    id   int
    描述名称 (uf_name)  varchar
    条件    (uf_condtion) int
    优惠金额 (uf_price)  int
    数量     (uf_num) int
    店铺名称  (uf_shop_name) varchar
    是否可使用 (uf_available)  boolean
    领取时间   (uf_receive_time) datetime
    失效时间   (uf_overdue_time) datetime
    是否已使用 (uf_isdel)  boolean
    外键关联：
        用户（id）(uf_user)  int
    '''
    uf_name = models.CharField(max_length=100)
    uf_condtion = models.IntegerField()
    uf_price = models.IntegerField()
    uf_num = models.IntegerField()
    uf_shop_name = models.CharField(max_length=100)
    uf_available = models.BooleanField(default=True)
    uf_receive_time = models.DateTimeField(auto_now_add=True)
    uf_overdue_time = models.DateTimeField()
    uf_isdel = models.BooleanField(default=False)
    uf_user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)


    def __str(self):
        return self.uf_name


    class Meta:
        verbose_name='用户优惠券表'
        verbose_name_plural=verbose_name
        db_table = 'user_favourable'


# 订单表
class Order(models.Model):
    id_num = models.IntegerField(primary_key=True)
    # 商品长名称
    o_long_name = models.CharField(max_length=200)
    # 商品五环价
    o_price = models.IntegerField()
    # 颜色
    o_color = models.CharField(max_length=10)
    # 尺码
    o_size = models.CharField(max_length=5)
    # 数量
    o_num = models.IntegerField()
    # 店铺名称
    o_shop_name = models.CharField(max_length=100)
    # 收货人信息
    o_collect_infor = models.IntegerField()
    # 用户备注
    o_remarks = models.CharField(max_length=300)
    # 总价
    o_total_price = models.DecimalField(max_digits=7, decimal_places=2)
    # 生成时间
    o_establish = models.DateTimeField(auto_now_add=True)
    # 是否删除
    o_isdel = models.BooleanField(default=False)
    # 是否匿名购买
    o_is_anonyous = models.BooleanField(default=False)
    # 外键：用户id
    o_user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)

    def __str__(self):
        return self.o_long_name

    class Meta:
        verbose_name='订单表'
        verbose_name_plural=verbose_name
        db_table = "order"



# 配送方式表
class Shipping(models.Model):
    # 方式
    s_type = models.CharField(max_length=20,verbose_name='配送方式')
    # 邮费
    s_price = models.IntegerField(verbose_name='邮费')
    # 外键
    S_order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return self.s_type

    class Meta:
        verbose_name='配送方式表'
        verbose_name_plural=verbose_name
        db_table = "shopping"


# 发票表
class Invoice(models.Model):
    # 类型
    i_type = models.CharField(max_length=10,verbose_name='类型')
    # 名称
    i_name = models.CharField(max_length=100,verbose_name='名称')
    # 电话
    i_phone = models.IntegerField(verbose_name='电话')
    # 地址
    i_address = models.CharField(max_length=300,verbose_name='地址')
    # 纳税人识别号
    i_header = models.CharField(max_length=30,verbose_name='纳税人识别号')
    # 开户银行
    i_opening_back = models.CharField(max_length=100,verbose_name='开户银行')
    # 银行账户
    i_account = models.CharField(max_length=30,verbose_name='银行账户')
    # 关联外键  订单号，i_order  int
    i_order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return self.i_type + self.i_name

    class Meta:
        verbose_name='发票表'
        verbose_name_plural=verbose_name
        db_table = "invoice"



# 收货地址表
class Address(models.Model):
    # 收货人姓名
    a_name = models.CharField(max_length=30,verbose_name='收货人姓名')
    # 收货人手机号
    a_phone = models.CharField(max_length=12,verbose_name='收货人手机号')
    # 所在地区
    a_region = models.CharField(max_length=400,verbose_name='所在地区')
    # 详细信息
    a_detailed_info = models.CharField(max_length=400,verbose_name='详细信息')
    # 外键
    a_user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)

    def __str__(self):
        return self.a_name

    class Meta:
        verbose_name='收货地址'
        verbose_name_plural=verbose_name
        db_table = "address"
        ordering = ['-id']




# 商品分类表
class Classification(models.Model):
    c_level = models.IntegerField(primary_key=True)
    c_name = models.CharField(max_length=10,verbose_name='商品分类名')
    c_superior = models.ForeignKey('self', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.c_name

    class Meta:
        verbose_name='商品分类表'
        verbose_name_plural=verbose_name
        db_table = 'classification'

class City(models.Model):
    id = models.IntegerField(default=0, primary_key=True)
    pid = models.IntegerField(null=True,blank=True)
    cityname = models.CharField(max_length=255)
    type = models.IntegerField(null=True)

    class Meta:
        db_table = 'city'


