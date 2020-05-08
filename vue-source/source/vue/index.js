import { initState } from './observe'
function Vue(options) { // Vue原始用户传入的
    this._init(options);
}

Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;

    // MVVM 原理
    initState(vm); // data computed watch

    // 初始化工作
    // 编译模板
    if (vm.$options.el) {
        vm.$mount();
    }
}

function query(el) {
    if (typeof el === 'string') {
        return document.querySelector(el);
    }
    return el;
}

// 渲染页面 将组建进行挂载
Vue.prototype.$mount = function() {
    let vm = this;
    let el = vm.$options.el; // 获取元素
    el = vm.$el = query(el); // 获取当前挂载的节点
}

export default Vue;