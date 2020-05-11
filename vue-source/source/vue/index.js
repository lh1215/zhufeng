import { initState } from './observe'
import Watcher from './observe/watcher';
import { compiler } from './util';
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


Vue.prototype._update = function() {
    // 用用户传入的数据，去更新视图
    let vm = this;
    let el = vm.$el;
    // 创建文档碎片，原因是防止每次操作后都编译真实dom，这样性能不高，操作内存的dom（虚拟的），最后再细化到页面上
    let node = document.createDocumentFragment();
    let firstChild;
    while(firstChild = el.firstChild) {
        node.appendChild(firstChild); // 如果目标元素存在，会被剪切移动
    }
    // todo 对文本进行替换
    compiler(node, vm);
    el.appendChild(node);
    // 需要匹配{{}}的方式来进行替换


    // 依赖收集 属性改变了 需要重新渲染 watcher 和 dep
    
}

// 渲染页面 将组建进行挂载
Vue.prototype.$mount = function() {
    let vm = this;
    let el = vm.$options.el; // 获取元素
    el = vm.$el = query(el); // 获取当前挂载的节点
    
    // 渲染时通过 watcher 来渲染的
    // 渲染 watcher 用于渲染的 watcher
    // vue2.0 组件级别更新，new Vue产生一个组件
    
    let updateComponent = () => { // 更新组件、渲染的逻辑
        vm._update(); // 更新组件
    }

    new Watcher(vm, updateComponent);

    // 我需要让每个数据 他更改了 需要重新的渲染
}

Vue.prototype.$watch = function(expr, handler) {
    // 原理：创建一个watcher
    let vm = this;
    new Watcher(vm, expr, handler, {user: true}); // 用户自己定义的方法
}

export default Vue;