import Observe from './observe';
export function initState(vm) {
    // 做不同的初始化工作
    let opts = vm.$options;
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed();
    }
    if (opts.watch) {
        initWatch(vm);
    }
}

export function observe(data) {
    if (typeof data !== 'object' || data === null) return;
    return new Observe(data);
}

function proxy(vm, source, key) {
    // 把 _data 的属性绑定到vm的外层
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key];
        },
        set(newValue) {
            vm[source][key] = newValue;
        }
    });
}

function initData(vm) {
    let data = vm.$options.data;
    // 
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
    for(let key in data) {
        proxy(vm, '_data', key);
    }
    observe(vm._data);
}
function initComputed() {}

function createWatcher(vm, key, handler) {
    // 内部最终也会使用￥watch方法
    return vm.$watch(key, handler);
}

function initWatch(vm) {
    let watch = vm.$options.watch; // 获取用户传入的watch属性
    for (let key in watch) { // msg(){}
        let handler = watch[key];
        createWatcher(vm, key, handler);
    }

}