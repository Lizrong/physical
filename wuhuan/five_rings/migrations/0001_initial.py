# Generated by Django 2.1.4 on 2018-12-10 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('a_name', models.CharField(max_length=30, verbose_name='收货人姓名')),
                ('a_phone', models.CharField(max_length=12, verbose_name='收货人手机号')),
                ('a_region', models.CharField(max_length=400, verbose_name='所在地区')),
                ('a_detailed_info', models.CharField(max_length=400, verbose_name='详细信息')),
            ],
            options={
                'verbose_name': '收货地址',
                'verbose_name_plural': '收货地址',
                'db_table': 'address',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('c_number', models.IntegerField()),
                ('c_color', models.CharField(max_length=20)),
                ('c_size', models.CharField(max_length=10)),
                ('c_price', models.IntegerField()),
                ('c_state', models.BooleanField(default=True)),
                ('c_add_datetime', models.DateTimeField(auto_now_add=True)),
                ('c_isdel', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': '购物车',
                'verbose_name_plural': '购物车',
                'db_table': 'cart',
            },
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.IntegerField(default=0, primary_key=True, serialize=False)),
                ('pid', models.IntegerField(blank=True, null=True)),
                ('cityname', models.CharField(max_length=255)),
                ('type', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'city',
            },
        ),
        migrations.CreateModel(
            name='Classification',
            fields=[
                ('c_level', models.IntegerField(primary_key=True, serialize=False)),
                ('c_name', models.CharField(max_length=10, verbose_name='商品分类名')),
                ('c_superior', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='five_rings.Classification')),
            ],
            options={
                'verbose_name': '商品分类表',
                'verbose_name_plural': '商品分类表',
                'db_table': 'classification',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('c_user', models.CharField(max_length=30)),
                ('c_coincidence_level', models.IntegerField()),
                ('c_server_level', models.IntegerField()),
                ('c_deilvery_level', models.IntegerField()),
                ('c_idea', models.CharField(max_length=300)),
                ('c_color', models.CharField(max_length=20)),
                ('c_size', models.CharField(max_length=10)),
                ('c_datetime', models.DateTimeField(auto_now_add=True)),
                ('c_example', models.CharField(max_length=600)),
                ('c_page_view', models.IntegerField(default=0)),
                ('c_praise', models.IntegerField(default=0)),
                ('c_anonymous', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': '评论信息表',
                'verbose_name_plural': '评论信息表',
                'db_table': 'comment',
            },
        ),
        migrations.CreateModel(
            name='CommodityInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ci_size', models.CharField(max_length=10)),
                ('ci_color', models.CharField(max_length=20)),
                ('ci_inventory', models.IntegerField()),
            ],
            options={
                'verbose_name': '商品信息表',
                'verbose_name_plural': '商品信息表',
                'db_table': 'commodity_info',
            },
        ),
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('g_code', models.CharField(max_length=20, verbose_name='商品编号')),
                ('g_name', models.CharField(max_length=100, verbose_name='商品名称')),
                ('g_long_name', models.CharField(max_length=200, verbose_name='商品详细名称')),
                ('g_shoppe', models.DecimalField(decimal_places=2, max_digits=6, verbose_name='专柜价格')),
                ('g_price', models.DecimalField(decimal_places=2, max_digits=6, verbose_name='五环价')),
                ('g_brand', models.CharField(max_length=50, verbose_name='品牌')),
                ('g_style', models.CharField(max_length=6, verbose_name='款式')),
                ('g_clasify', models.CharField(max_length=300, verbose_name='分类')),
                ('g_thumbail', models.CharField(max_length=100, verbose_name='图片')),
                ('g_month_sales', models.IntegerField(default=0, verbose_name='当月销售量')),
                ('g_page_view', models.IntegerField(default=0, verbose_name='浏览量')),
                ('g_stoke_datetime', models.DateTimeField(auto_now_add=True, verbose_name='进货时间')),
                ('g_grounding', models.DateTimeField(verbose_name='上架时间')),
                ('g_isdel', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': '商品表',
                'verbose_name_plural': '商品表',
                'db_table': 'goods',
            },
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('i_type', models.CharField(max_length=10, verbose_name='类型')),
                ('i_name', models.CharField(max_length=100, verbose_name='名称')),
                ('i_phone', models.IntegerField(verbose_name='电话')),
                ('i_address', models.CharField(max_length=300, verbose_name='地址')),
                ('i_header', models.CharField(max_length=30, verbose_name='纳税人识别号')),
                ('i_opening_back', models.CharField(max_length=100, verbose_name='开户银行')),
                ('i_account', models.CharField(max_length=30, verbose_name='银行账户')),
            ],
            options={
                'verbose_name': '发票表',
                'verbose_name_plural': '发票表',
                'db_table': 'invoice',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id_num', models.IntegerField(primary_key=True, serialize=False)),
                ('o_long_name', models.CharField(max_length=200)),
                ('o_price', models.IntegerField()),
                ('o_color', models.CharField(max_length=10)),
                ('o_size', models.CharField(max_length=5)),
                ('o_num', models.IntegerField()),
                ('o_shop_name', models.CharField(max_length=100)),
                ('o_collect_infor', models.IntegerField()),
                ('o_remarks', models.CharField(max_length=300)),
                ('o_total_price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('o_establish', models.DateTimeField(auto_now_add=True)),
                ('o_isdel', models.BooleanField(default=False)),
                ('o_is_anonyous', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': '订单表',
                'verbose_name_plural': '订单表',
                'db_table': 'order',
            },
        ),
        migrations.CreateModel(
            name='Shipping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('s_type', models.CharField(max_length=20, verbose_name='配送方式')),
                ('s_price', models.IntegerField(verbose_name='邮费')),
                ('S_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Order')),
            ],
            options={
                'verbose_name': '配送方式表',
                'verbose_name_plural': '配送方式表',
                'db_table': 'shopping',
            },
        ),
        migrations.CreateModel(
            name='Shop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('s_name', models.CharField(max_length=50)),
                ('s_brand', models.CharField(max_length=30)),
                ('s_page_view', models.IntegerField(default=0)),
                ('s_collection', models.IntegerField(default=0)),
                ('c_praise', models.IntegerField(default=0)),
                ('s_history', models.TextField()),
            ],
            options={
                'verbose_name': '店铺表',
                'verbose_name_plural': '店铺表',
                'db_table': 'shop',
            },
        ),
        migrations.CreateModel(
            name='ShopFavourable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sf_name', models.CharField(max_length=100)),
                ('sf_condtion', models.IntegerField()),
                ('sf_price', models.IntegerField()),
                ('sf_num', models.IntegerField()),
                ('sf_establish', models.DateTimeField(auto_now_add=True)),
                ('sf_activity_start', models.DateTimeField(default='2018-12-10 23:19:53')),
                ('sf_activity_stop', models.DateTimeField()),
                ('sf_type', models.IntegerField()),
                ('sf_shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Shop')),
            ],
            options={
                'verbose_name': '店铺优惠券表',
                'verbose_name_plural': '店铺优惠券表',
                'db_table': 'shop_favourable',
            },
        ),
        migrations.CreateModel(
            name='ShowInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('si_one', models.CharField(max_length=100)),
                ('si_two', models.CharField(max_length=100)),
                ('si_three', models.CharField(max_length=100)),
                ('si_four', models.CharField(max_length=100)),
                ('si_five', models.CharField(max_length=100)),
                ('si_other', models.TextField()),
                ('si_goods', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Goods')),
            ],
            options={
                'verbose_name': '商品展示表',
                'verbose_name_plural': '商品展示表',
                'db_table': 'show_info',
            },
        ),
        migrations.CreateModel(
            name='UserFavourable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uf_name', models.CharField(max_length=100)),
                ('uf_condtion', models.IntegerField()),
                ('uf_price', models.IntegerField()),
                ('uf_num', models.IntegerField()),
                ('uf_shop_name', models.CharField(max_length=100)),
                ('uf_available', models.BooleanField(default=True)),
                ('uf_receive_time', models.DateTimeField(auto_now_add=True)),
                ('uf_overdue_time', models.DateTimeField()),
                ('uf_isdel', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': '用户优惠券表',
                'verbose_name_plural': '用户优惠券表',
                'db_table': 'user_favourable',
            },
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('u_name', models.CharField(max_length=30, unique=True)),
                ('u_pwd', models.CharField(max_length=40)),
                ('u_confirm_pwd', models.CharField(max_length=40)),
                ('u_phone', models.CharField(max_length=20)),
            ],
            options={
                'verbose_name': '用户表',
                'verbose_name_plural': '用户表',
                'db_table': 'user_info',
            },
        ),
        migrations.AddField(
            model_name='userfavourable',
            name='uf_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.UserInfo'),
        ),
        migrations.AddField(
            model_name='order',
            name='o_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.UserInfo'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='i_order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Order'),
        ),
        migrations.AddField(
            model_name='goods',
            name='g_info',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Shop', verbose_name='店铺'),
        ),
        migrations.AddField(
            model_name='commodityinfo',
            name='c_goods',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Goods'),
        ),
        migrations.AddField(
            model_name='comment',
            name='c_goods',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Goods'),
        ),
        migrations.AddField(
            model_name='comment',
            name='c_relation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Comment'),
        ),
        migrations.AddField(
            model_name='cart',
            name='c_goods',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.Goods'),
        ),
        migrations.AddField(
            model_name='cart',
            name='c_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.UserInfo'),
        ),
        migrations.AddField(
            model_name='address',
            name='a_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='five_rings.UserInfo'),
        ),
    ]
