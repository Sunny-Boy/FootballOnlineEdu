import http from "../utils/http"
import {reactive, ref} from "vue"

const user = reactive({
    login_type: 0, // 登录方式，0，密码登录，1，短信登录
    account: "",  // 登录账号/手机号/邮箱
    password: "", // 登录密码
    remember: false, // 是否记住登录状态
    re_password: "",// 确认密码
    login(res){
        // 用户登录
        return http.post("/users/login/", {
            "ticket": res.ticket,
            "randstr": res.randstr,
            "username": this.account,
            "password": this.password,
        })
    },
    check_mobile(){
        // 验证手机号
        return http.get(`/users/mobile/${this.mobile}/`)
    },
    register(data){
        data.mobile = this.mobile
        data.re_password = this.re_password
        data.password = this.password
        data.sms_code = this.code
        // 用户注册请求
        return http.post("/users/register/", data)
    }
})

export default user;