from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from rest_framework.generics import CreateAPIView
from .serializers import UserRegisterModelSerializer

import random
from django_redis import get_redis_connection
from django.conf import settings
from ronglianyunapi import send_sms


class UserAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterModelSerializer


class MobileAPIView(APIView):
    def get(self, request, mobile):
        """
        校验手机号是否已注册
        :param request:
        :param mobile: 手机号
        :return:
        """
        try:
            User.objects.get(mobile=mobile)
            return Response({"errmsg": "当前手机号已注册"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            # 如果查不到该手机号的注册记录，则证明手机号可以注册使用
            return Response({"errmsg": "OK"}, status=status.HTTP_200_OK)


"""
/users/sms/(?P<mobile>1[3-9]\d{9})
"""


class SMSAPIView(APIView):
    """
    SMS短信接口视图
    """

    def get(self, request, mobile):
        """发送短信验证码"""
        redis = get_redis_connection("sms_code")
        # 判断手机短信是否处于发送冷却中[60秒只能发送一条]
        interval = redis.ttl(f"interval_{mobile}")  # 通过ttl方法可以获取保存在redis中的变量的剩余有效期
        if interval != -2:
            return Response(
                {"errmsg": f"短信发送过于频繁，请{interval}秒后再次点击获取!"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 基于随机数生成短信验证码
        # code = "%06d" % random.randint(0, 999999)
        code = f"{random.randint(0, 999999):06d}"
        # 获取短信有效期的时间
        time = settings.RONGLIANYUN.get("sms_expire")
        # 短信发送间隔时间
        sms_interval = settings.RONGLIANYUN["sms_interval"]
        # 调用第三方sdk发送短信
        send_sms(settings.RONGLIANYUN.get("reg_tid"), mobile, datas=(code, time // 60))

        # 记录code到redis中，并以time作为有效期
        # 使用redis提供的管道对象pipeline来优化redis的写入操作[添加/修改/删除]
        pipe = redis.pipeline()
        pipe.multi()  # 开启事务
        pipe.setex(f"sms_{mobile}", time, code)
        pipe.setex(f"interval_{mobile}", sms_interval, "_")
        pipe.execute()  # 提交事务，同时把暂存在pipeline的数据一次性提交给redis

        return Response({"errmsg": "OK"}, status=status.HTTP_200_OK)
