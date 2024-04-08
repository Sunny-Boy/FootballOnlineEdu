import {createStore} from "vuex"

// 实例化一个vuex存储库
export default createStore({
    state () {  // 数据存储位置，相当于组件中的data
        return {
          user: {

          }
        }
    },
    mutations: { // 操作数据的方法，相当于methods
        login (state, user) {  // state 就是上面的state   state.user 就是上面的数据
          state.user = user
        }
    }
})