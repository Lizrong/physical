import hashlib
import os
import random
from five_rings.code import Code
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from wuhuan import settings

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q, Count
from five_rings.models import *
from collections import OrderedDict


def index(request):
    title = "主页"
    # 获取一级分类
    level_one = Classification.objects.filter(c_superior=0)[1:]
    level = OrderedDict()
    # 遍历一级分类拿到其包含的二级分类
    for info in level_one:
        ev = Classification.objects.filter(c_superior=info.c_level)
        # 提取前８个二级分类以属性的形式添加到对应的一级分类上
        info.so8 = ev[:8]
        # 一级对象为ｋｅｙ，包含的二级分类未ｖａｌｕｅ
        level[info] = ev
        le = OrderedDict()
        le2 = OrderedDict()
        # 遍历二级分类获取对应的三级分类
        for info1 in ev:
            # 以二级分类对象为ｋｅｙ，三级分类信息未ｖａｌｕｅ
            le2[info1] = Classification.objects.filter(c_superior=info1.c_level)
        # 更新有序字典
        le[info] = le2
        level.update(le)
    goods_1 = Goods.objects.filter(g_clasify__contains='运动产品')[:10]
    goods_2 = Goods.objects.filter(g_clasify__contains='潮流休闲')[:10]
    goods_3 = Goods.objects.filter(g_clasify__contains='户外')[:10]
    goods_4 = Goods.objects.filter(g_clasify__contains='包')[:10]
    return render(request, 'main.html', locals())


def query(request):
    s = ''
    get = request.GET
    brand_name = get.get('brandName')
    root_name = get.get('rootName')
    text = get.get('text')
    node_name = get.get('nodeName')
    gd = get.get('GD')
    print('款式：', gd)
    current_price = get.get("currentPrice")
    sort = get.get('sort')
    pg = get.get('page', 1)
    goods = Goods.objects.all()
    # goods = Goods.objects.get_queryset().order_by('id')
    print('goods', goods)
    flag = '全部分类'
    try:
        # 根据品牌筛选
        if brand_name:
            goods = goods.filter(g_brand=brand_name)
            s += 'brandName=%s&' % brand_name
    except Exception as e:
        print('品牌筛选异常', e)
        print('接收到的品牌名为：', brand_name)
    try:
        # 根据款式筛选
        if gd:
            goods = goods.filter(g_style=gd)
            s += 'GD=%s&' % gd
    except Exception as e:
        print('款式筛选异常', e)
        print('接收到的款式名为：', gd)
    try:
        # 根据一级分类筛选
        if root_name:
            flag = root_name
            goods = goods.filter(g_clasify__contains=root_name)
            s += 'roontName=%s&' % root_name
    except Exception as e:
        print('一级分类筛选异常', e)
        print('接收到的一级分类名为：', root_name)
    try:
        # 根据二级分类筛选
        if text:
            flag = text
            goods = goods.filter(g_clasify__icontains=text)
            s += 'text=%s&' % text
    except Exception as e:
        print('二级分类筛选异常', e)
        print('接收到的二级分类名为：', text)
    try:
        # 根据三级分类筛选
        if node_name:
            flag = node_name
            goods = goods.filter(g_clasify__contains=node_name)
            s += 'nodeName=%s&' % node_name
    except Exception as e:
        print('三级分类筛选异常', e)
        print('接收到的三级分类名为：', node_name)
    try:
        # 根据价格区间筛选
        price_list = []
        if current_price:
            price_down, price_up = current_price.split('-')
            print('价格截断：', int(price_up), int(price_down))
            if int(price_down) > 1500:
                goods = goods.filter(g_price__gte=1501)
            else:
                goods = goods.filter(Q(g_price__gte=int(price_down)), Q(g_price__lte=int(price_up)))
            price_list = [{'name': current_price, 'num': len(goods)}]
            s += 'currentPrice=%s&' % current_price
        else:
            price400 = len(goods.filter(Q(g_price__gte=0), Q(g_price__lte=400)))
            price1000 = len(goods.filter(Q(g_price__gte=401), Q(g_price__lte=1000)))
            price1500 = len(goods.filter(Q(g_price__gte=1001), Q(g_price__lte=1500)))
            price1501 = len(goods.filter(g_price__gte=1501))
            price_list = [{'name': '0-400', 'num': price400}, {'name': '401-1000', 'num': price1000},
                          {'name': '1001-1500', 'num': price1500}, {'name': '1500-~', 'num': price1501}]
    except Exception as e:
        print('价格筛选异常', e)
        print('接收到的价格区间名为：', text)
    # 品牌进行分类
    brand = goods.values('g_brand').annotate(num=Count("g_brand"))
    print('品牌：', brand)
    # 显示
    brand_f = brand[:14]
    # 隐藏
    brand_l = brand[14:]
    # 款式分类
    gender = goods.values('g_style').annotate(num=Count('g_style'))
    print('款式分类：', gender)
    # 将 子分类名 分类
    cl = Classification.objects.filter(c_name=flag)[0]
    if flag == '全部分类':
        clasify = Classification.objects.filter(c_superior=cl.c_level).values('c_name')[1:8]
    else:
        clasify = Classification.objects.filter(c_superior=cl.c_level).values('c_name')[:7]
    for i in clasify:
        i['num'] = len(goods.filter(g_clasify__contains=i['c_name']))
    print('clasigy:', clasify)
    # 排序
    if sort == 'price-asc':
        goods = goods.order_by('g_price')
    elif sort == "price-desc":
        goods = goods.order_by('-g_price')
    elif sort == "sales-asc":
        goods = goods.order_by("g_month_sales")
    elif sort == "sales-desc":
        goods = goods.order_by('-g_month_sales')
    if sort:
        s1 = s + 'sort=%s&' % sort
    else:
        s1 = s
    s = s.strip('&')
    s1 = s.strip('&')
    if not goods:
        return render(request, 'query.html')
    paginator = Paginator(goods, 35)
    # 商品总数
    number = paginator.count
    # 总页数
    nums = paginator.num_pages
    try:
        page = paginator.page(int(pg))
    except EmptyPage as e:  # 页码超出范围 返回最后一页
        print('分页异常：', e)
        page = 1
    except PageNotAnInteger as e:
        print('分页异常：', e)
        page = paginator.page(1)
    except Exception as e:
        print('分页异常：', e)
        page = paginator.page(1)
    print('s:', s)
    print('s1', s1)
    print('商品信息: ', goods)
    print('111:', page)
    data2 = {'brand_l': brand_l, 'brand_f': brand_f, "gender": gender, "clasify": clasify,
             "s": s, 's1': s1, "paginator": paginator, "number": number, "nums": nums,
             "page": page}
    return render(request, 'query.html', data2)


def order_pay(request):
    ord_num = request.GET.get('orderNo')
    print(ord_num, type(ord_num))
    order = Order.objects.get(pk=int(ord_num))

    return render(request, 'order2.html', locals())


def order_update(request):
    ord_num = request.POST.get('ord_num')
    num = ord_num.split('：')[1]
    order = Order.objects.filter(pk=int(num))
    data = {
        'state': 201
    }
    if order:
        order.delete()
        order.save()
        data['state'] = 200
    return JsonResponse(data)


def personinfo(request):
    u = request.session.get('login_user')
    if not u:
        return redirect(reverse('wuhuan:login'))
    user = UserInfo.objects.get(pk=int(u['id']))
    orders = user.order_set.all()
    return render(request, 'personinfo.html', locals())


def order_commit(request):
    user = request.session.get('login_user', 1)
    if not user:
        return redirect('/index/')
    print('user1:', user)
    user = UserInfo.objects.get(pk=int(user['id']))
    cites = City.objects.filter(pid=1)
    address = user.address_set.all()
    price = 0
    carts = user.cart_set.filter(c_state=True, c_isdel=False)
    for cart in carts:
        price += cart.c_price * cart.c_number
    return render(request, 'ordercommit.html', locals())


def add_address(request):
    user_id = UserInfo.objects.get(request.session.get('login_user')['id'])
    name = request.POST.get('name')
    province = City.objects.filter(id=int(request.POST.get('province')))[0].cityname
    city = City.objects.filter(id=int(request.POST.get('cityId')))[0].cityname
    district = City.objects.filter(id=int(request.POST.get('districtId')))[0].cityname
    address = request.POST.get('address')
    telnumber = request.POST.get('telnumber')
    a_region = province + ' ' + city + ' ' + district
    ads = Address.objects.create(a_name=name, a_phone=telnumber, a_region=a_region,
                                 a_detailed_info=address, a_user_id=user_id)
    ads.save()
    ads_id = ads.id
    return JsonResponse({'name': name, 'ads_id': ads_id, 'telnumber': telnumber,
                         'a_region': a_region, 'address': address, "state": 200})


def delete_address(request):
    id_ = request.POST.get('deli_id')
    ad = Address.objects.get(pk=id_)
    ad.delete()
    ad.save()
    return JsonResponse({'state': 200})


order_number = 8


def create_order_number():
    global order_number
    today = datetime.datetime.today().strftime('%y%m%d')
    n = int(today + str(order_number).rjust(2, '0'))
    order_number += 1
    print(n, type(n))
    return n


def order_create(request):
    user = UserInfo.objects.get(pk=7)
    memo = request.POST.get('memo')
    exp = int(request.POST.get('exp'))
    price = eval(request.POST.get('price'))
    state = int(request.POST.get('state'))
    add_id = int(request.POST.get('deliveryFee'))
    print(user, '**', memo, '**', exp, '**', price, '**', state, '**', add_id)
    if state != 200:
        return JsonResponse({'data': 'exception'})
    carts = user.cart_set.filter(c_state=True, c_isdel=False)
    order_lt = []
    for cart in carts:
        g = cart.c_goods
        c = g.commodityinfo_set.filter(ci_color=cart.c_color, ci_size=cart.c_size)
        if not c or c[0].ci_inventory < cart.c_number:
            return JsonResponse({'data': 'false'})
        # o_long_name = g.g_long_name
        # o_price = g.g_price
        # o_color = cart.c_color
        # o_size = cart.c_size
        # o_num = cart.c_number
        # o_shop_name = g.g_info.s_name
        # o_collect_infor = add_id
        # o_remarks = memo
        # o_total_price = price
        # o_user_id = user.id
        # id_num = create_order_number()
        c[0].ci_inventory -= cart.c_number
        c[0].save()
        ord = Order.objects.create(o_long_name=g.g_long_name,
                                   o_price=g.g_price,
                                   o_color=cart.c_color,
                                   o_size=cart.c_size,
                                   o_num=cart.c_number,
                                   o_shop_name=g.g_info.s_name,
                                   o_collect_infor=add_id,
                                   o_remarks=memo,
                                   o_total_price=price,
                                   o_user_id=user.id,
                                   id_num=create_order_number())
        ord.save()
        order_lt.append(ord.id_num)
        # 删除购物车信息
        # cart.delete()
    return JsonResponse({'data': 'success', 'order_num': order_lt})


def select_city(request):
    pid = request.POST['pid']
    print(pid, "2yyyyyyyyyyy")
    ci = []
    citys = City.objects.filter(pid=int(pid))
    print(citys)
    for c in citys:
        dt = {'id_': c.id, 'cityname': c.cityname}
        ci.append(dt)
    print(ci)
    return JsonResponse({'city': ci})


def detail(request, d_id):
    goods = Goods.objects.filter(id=d_id)
    for good in goods:
        g_code = good.g_code
        g_long_name = good.g_long_name
        g_shoppe = good.g_shoppe
        g_brand = good.g_brand
        g_thumbail = good.g_thumbail
        g_month_sales = good.g_month_sales
        g_page_view = good.g_page_view
        g_id = good.id

        g_info = good.g_info
        s_name = g_info.s_name
        s_history = g_info.s_history

        commodity_infos = good.commodityinfo_set.all()
    return render(request, "detail.html", locals())


def save_detail_cart(request):
    user = request.session.get('login_user')
    if not user:
        return redirect(reverse('wuhuan:login'))
    user_id = user['id']
    c_number = request.GET.get("c_number")
    g_id = request.GET.get("c_id")
    c_color = request.GET.get("c_color")
    c_size = request.GET.get("c_size")
    c_price = Goods.objects.get(pk=int(g_id)).g_price
    print(c_number, g_id, c_color, c_size)
    Cart.objects.create(c_goods_id=int(g_id), c_number=int(c_number),
                        c_color=str(c_color), c_size=c_size,
                        c_price=c_price, c_user_id=user_id)
    return JsonResponse({'data': '/cart/'})


number = None


# 密码加密
def generate_password(password):
    m5 = hashlib.md5()
    m5.update(password.encode('utf-8'))
    return m5.hexdigest()

def check_username(request):
    username = request.GET.get("username")
    users = UserInfo.objects.filter(u_name=username)
    data = {
        "status": 666,
        "color": "green",
        "msg": "恭喜，可以使用该用户名",
    }
    if users:
        print("jjjjjkkkk")
        data['status'] = 444,
        data['color'] = 'red'
        data["msg"] = "该用户名已经被注册，请选用其他用户名"
    return JsonResponse(data)


def ajax_request(request):
    global number
    code = Code()
    n = random.randint(1, 100)
    number = code.get_codepic(os.path.join(settings.BASE_DIR, "static/images/code/img" + str(n) + ".jpg"))
    return JsonResponse({"path": "/static/images/code/img" + str(n) + ".jpg"})


def user_register(request):
    global number
    if request.method == 'GET':
        code = Code()
        number = code.get_codepic(os.path.join(settings.BASE_DIR, "static/images/code/img1.jpg"))
        return render(request, 'register.html')
    else:
        username = request.POST['username']
        userpass = request.POST['userpass']
        userpass = generate_password(userpass)
        confirmpass = request.POST['confirmpass']
        confirmpass = generate_password(confirmpass)
        phone = request.POST['phone']
        picture = request.POST['picture']
        print(username, userpass)
        if not number == picture:
            code = Code()
            number = code.get_codepic(os.path.join(settings.BASE_DIR, "static/images/code/img1.jpg"))
            msg = "验证码错误,请重新输入！"
            return render(request, 'register.html', locals())
        try:
            user = UserInfo.objects.create(u_name=username, u_pwd=userpass, u_confirm_pwd=confirmpass, u_phone=phone)
        except:
            return redirect(reverse("wuhuan:register"))
        request.session['login_user'] = {'id': user.id,
                                         'username': user.u_name}
        return redirect(reverse("wuhuan:login"))

def user_login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    else:
        username = request.POST['username']
        userpass = request.POST['userpass']
        userpass = generate_password(userpass)
        users = UserInfo.objects.filter(u_name=username, u_pwd=userpass)
        if users:
            user = users.first()
            request.session['login_user'] = {'id': user.id,
                                             'username': user.u_name}
            return redirect(reverse("wuhuan:index"))
        else:
            msg = "用户名或者密码错误，请重新输入"
            return render(request, "login.html", locals())


def quit(request):
    request.session.flush()
    return redirect(reverse("wuhuan:index"))


# 进入购物车
def cart(request):
    user_id = request.session.get('login_user')['id']
    if user_id:
        cartslist = Cart.objects.filter(c_user_id=user_id)
        infolist = []
        for cart in cartslist:
            good = cart.c_goods
            # print(good.g_name)
            temp_dict = {}
            # 产品图片
            temp_dict['goodimg'] = good.g_thumbail
            # 产品名称
            temp_dict['goodname'] = good.g_long_name
            print(good.g_long_name)
            # 产品id
            temp_dict['goodid'] = good.id
            # 购物车id
            temp_dict['id'] = cart.id
            # 产品专柜价
            temp_dict['g_shoppe'] = good.g_shoppe
            # 数量
            temp_dict['c_number'] = cart.c_number
            # 现价
            temp_dict['c_price'] = cart.c_price
            # 优惠价
            temp_dict['youhui'] = str(int(temp_dict['g_shoppe']) - int(temp_dict['c_price']))
            # 是否选中
            temp_dict['c_state'] = cart.c_state
            # 小计
            temp_dict['subtotal'] = temp_dict['c_price'] * temp_dict['c_number']
            infolist.append(temp_dict)
        return render(request, 'cart.html', locals())


#   购物车中的'+’号
def add_to_cart(request):
    print("addcart")
    price = 0
    # 接收ajax发送过来的goods_id
    goods_id = request.POST.get('goodid')
    # 从session中获取user_id
    user_id = request.session.get('login_user')['id']
    data = {
        'status': '200'
    }

    if not user_id:  # 未登录
        data['status'] = '900'
        return JsonResponse(data)
    else:
        carts = Cart.objects.filter(c_goods_id=goods_id, c_user_id=user_id)
        if carts:  # 说明该用户已经买了该种商品
            cart = carts.first()
            cart.c_number = cart.c_number + 1
            cart.save()  # 更新
            data['subtotal'] = cart.c_price * cart.c_number
            cartlist = Cart.objects.filter(c_state=1)
            for c in cartlist:
                price += c.c_price * c.c_number
            data['price'] = price
            data['cart_number'] = cart.c_number
            data['id_'] = cart.id
        else:  # 购物车中还没有该种商品
            cart = Cart.objects.create(c_goods_id=goods_id, c_user_id=user_id)
            data['cart_number'] = 1
            data['subtotal'] = cart.c_price * cart.c_number
            cartlist = Cart.objects.filter(c_state=1)
            for c in cartlist:
                price += c.c_price * c.c_number
            data['price'] = price

    return JsonResponse(data)


# 购物车中的'-'号
def sub_to_cart(request):
    # 接收ajax发送过来的goods_id
    price = 0
    goods_id = request.POST.get('goodid')
    # 从session中获取user_id
    user_id = request.session.get('login_user')['id']
    data = {
        'status': '200'
    }
    if not user_id:  # 未登录
        data['status'] = '900'
        return JsonResponse(data)
    else:
        carts = Cart.objects.filter(c_goods_id=goods_id, c_user_id=user_id)
        if carts:  # 说明该用户已经买了该种商品
            cart = carts.first()
            if cart.c_number == 1:
                cart.delete()  # 在购物车表中删除该记录
                data['cart_number'] = 0
                data['subtotal'] = cart.c_price * cart.c_number
                data['id_'] = cart.id
                cartlist = Cart.objects.filter(c_state=1)
                for c in cartlist:
                    price += c.c_price * c.c_number
                data['price'] = price
            else:
                cart.c_number = cart.c_number - 1
                cart.save()
                data['id_'] = cart.id
                data['subtotal'] = cart.c_price * cart.c_number
                cartlist = Cart.objects.filter(c_state=1)
                for c in cartlist:
                    price += c.c_price * c.c_number
                data['price'] = price
                data['cart_number'] = cart.c_number
        else:  # 购物车中还没有该商品
            data['msg'] = '购物车中没有该商品'
            data['status'] = '901'
            print("subcart")
    return JsonResponse(data)


# 改变商品的选中状态
def change_cart_select(request):
    price = 0

    # 从session中获取user_id
    user_id = request.session.get('login_user')['id']
    # 接收ajax传过来的购物车编号
    cartid = request.POST.get('cartid')
    data = {
        'status': 200,
        'price': 0
    }
    if not user_id:  # 未登录
        data['status'] = '900'
        return JsonResponse(data)
    else:
        # 根据主键查询购物车的记录
        carts = Cart.objects.filter(id=cartid)
        cart = carts.first()
        if cart:
            cart.c_state = not cart.c_state  # 改变选中状态，选中状态取反
            cart.save()  # 保存更新
            cartlist = Cart.objects.filter(c_state=1)
            for c in cartlist:
                price += c.c_price * c.c_number
            data['price'] = price
            return JsonResponse(data)


# 实现购物车商品的全选
def change_all_select(request):  # 购物车的全选逻辑
    sel = request.POST.get('sel')
    price = 0
    data = []
    if sel == 'false':
        carts = Cart.objects.filter(c_state=1)
        for cart in carts:
            cart.c_state = False
            dt = {"id_": cart.id, "state": 0}
            data.append(dt)
            cart.save()
    else:
        carts = Cart.objects.filter(c_state=0)
        for cart in carts:
            cart.c_state = True
            cart.save()
        carts = Cart.objects.all()
        for cart in carts:
            cart.c_state = True
            price += cart.c_number * cart.c_price
            print(price, 444444444)
            dt = {"id_": cart.id, "state": 1}
            data.append(dt)
    print(data, price, sel)
    return JsonResponse({"status": "200", "data": data, "price": price})


# 实现购物车的删除功能
def delete_cart(request):
    # 获取用户的id，查看用户是否登录
    user_id = request.session.get('login_user')['id']
    # 接收后台ajax发过来商品编号
    price = 0
    good_id = request.POST.get('goodid')
    data = {
        'status': 200
    }
    if not user_id:  # 未登录
        data['status'] = '900'
        return JsonResponse(data)
    else:
        carts = Cart.objects.filter(c_user_id=user_id, c_goods_id=good_id)
        cart = carts.first()
        cart.delete()
        # 同步结算
        cartlist = Cart.objects.filter(c_state=1)
        for c in cartlist:
            price += c.c_price * c.c_number
        data['price'] = price
        data['dell'] = 0
    return JsonResponse(data)


def add_info(request):
    user_id = UserInfo.objects.get(request.session.get('login_user')['id'])
    name = request.POST.get('name')
    province = City.objects.filter(id=request.POST.get('province'))[0].cityname
    city = City.objects.filter(id=request.POST.get('cityId'))[0].cityname
    district = City.objects.filter(id=request.POST.get('districtId'))[0].cityname
    address = request.POST.get('address')
    telnumber = request.POST.get('telnumber')
    a_region = province + '#' + city + '#' + district
    ads = Address.objects.create(a_name=name, a_phone=telnumber, a_region=a_region,
                                 a_detailed_info=address, a_user_id=user_id)
    ads.save()
    ads_id = ads.id
    return JsonResponse(locals())


def limtime(request):
    return render(request, 'limit_time.html')


def adidas(request):
    return render(request, 'adidas.html')


def nike(request):
    return render(request, 'nike.html')


def sikaiqi(request):
    return render(request, 'sikaiqi.html')


def kuangwu(request):
    return render(request, 'kuangwu.html')
