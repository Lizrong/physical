from PIL import Image,ImageDraw,ImageFont,ImageFilter
import random
import string

class Code(object):
    def __init__(self):
    # 随机获取四个字母
        self.length=4
    def get_random_char(self):
        code = []
        for _ in range(self.length):
            sign = random.randint(0, 2)
            start_, end_ = (ord('a'), ord('z')) if sign == 0 else (ord('A'), ord('Z')) if sign == 1 else (
                ord('0'), ord('9'))
            code.append(chr(random.randint(start_, end_)))
        pass_code = ''.join(code)
        print(pass_code)
        return pass_code

    # 获取颜色
    def get_random_color(self):
        return (random.randint(30, 100), random.randint(30, 100), random.randint(30, 100))

    # 获取验证码图片
    def get_codepic(self,path):
        width = 240
        height = 60
        # 创建画布
        image = Image.new('RGB', (width, height), (180, 180, 180))  # 画布大小
        font = ImageFont.truetype('C:/windows/fonts/Arial.ttf', size=40)  # 字体样式，大小
        draw = ImageDraw.Draw(image)
        # 创建验证码图片
        code = self.get_random_char()
        # 把验证码放到画布上
        for t in range(4):
            draw.text((60 * t + 10, 0), code[t], font=font, fill=self.get_random_color())
        # 填充噪点
        for _ in range(random.randint(1500, 3000)):
            draw.point((random.randint(0, width), random.randint(0, height)), fill=self.get_random_color())
        # 添加干扰线
        for _ in range(5):
            num_bath = []
            for _ in range(6):
                random_num = random.randint(0, 180)
                num_bath.append(random_num)
            final = (num_bath[0], num_bath[1]), (num_bath[2], num_bath[3]), (num_bath[4], num_bath[5])
            position_pool = []
            i = 0
            for _ in range(3):
                position_pool.append(final[i])
                i += 1
            draw.line(position_pool, fill=self.get_random_color(), width=5)

        # 模糊处理
        image = image.filter(ImageFilter.BLUR)
        # 保存名字为验证码的图片
        image.save(path, 'jpeg')
        return code




