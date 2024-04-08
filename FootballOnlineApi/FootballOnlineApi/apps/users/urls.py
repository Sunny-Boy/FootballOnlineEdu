from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, ObtainJSONWebToken, VerifyJSONWebToken, RefreshJSONWebToken
from . import views

urlpatterns = [
    path("login/", obtain_jwt_token, name="login"),
]

# 登录视图，获取access_token
obtain_jwt_token = ObtainJSONWebToken.as_view()
# 刷新token视图，依靠旧的access_token生成新的access_token
refresh_jwt_token = RefreshJSONWebToken.as_view()
# 验证现有的access_token是否有效
verify_jwt_token = VerifyJSONWebToken.as_view()