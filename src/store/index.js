import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 任务列表
    list: [],
    inputValue: '请输入您的目标',
    // 下一个ID
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 为store中的inputValue赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除store中的项
    removeItem(state, id) {
      // 根据id查找对应的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引，删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 改变列表项的选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(item => item.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清楚已经完成的任务
    cleanDone(state) {
      state.list = state.list.filter(item => !item.done)
    },
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      // 从public下的list.json来获取数据
      axios.get('/list.json').then(({
        data
      }) => {
        context.commit('initList', data)
        console.log(data)
      })
    }
  },
  getters: {
    // 统计未完成的任务条数
    unDoneLength(state) {
      return state.list.filter((item) => !item.done).length
    },
    // 显示特定的数据
    infolist(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'unDone') {
        return state.list.filter(item => !item.done)
      } else if (state.viewKey === 'done') {
        return state.list.filter(item => item.done)
      } else {
        return state.list
      }
    }
  },
  modules: {}
})
