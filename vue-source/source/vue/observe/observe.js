import { observe } from './index';
import { arrayMethods, observeArray, dependArray } from './array';
import Dep from './dep';
export function defineReactive(data, key, value) { // 定义响应式的数据变化
    // 如果value依旧是object的话，需要递归
    let childOb = observe(value);
    let dep = new Dep(); // 收集依赖 收集的事watcher
    Object.defineProperty(data, key, {
        // 依赖收集
        get() {
            if (Dep.target) {
                // 我们希望存入的watcher不能重复，如果重复会造成更新时多次渲染
                dep.depend(); // 他想让dep中可以存watcher，我还希望让这个watcher中也存放dep，实现一个多对多的关系
                if (childOb) {
                    childOb.dep.depend(); // 数组也收集了当前渲染的watcher
                    dependArray(value);
                }
            }
            return value;
        },
        // 通知依赖更新
        set(newValue) {
            if (value === newValue) return;
            console.log('设置数据');
            observe(newValue); // 如果你设置的值是一个对象的话，应该进行监控
            value = newValue;
            dep.notify();
        }
    })
}
class Observe {
    constructor(data) { // data是我们刚定义的vm._data
        // 将用户的数据使用defineProperty重新定义
        this.dep = new Dep(); // 此 dep 专门为数组而设
        // 每个对象 包括数组都有一个__ob__属性
        Object.defineProperty(data, '__ob__', {
            get: () => this,
        });
        if (Array.isArray(data)) { // 重写push等方法
            data.__proto__ = arrayMethods; // 把重写的方法赋值给data数组的原型链上
            observeArray(data); // 观测数组中的每一项
        } else {
            this.walk(data);
        }
    }

    walk(data) {
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[keys[i]];
            defineReactive(data, key, value);
        }
    }
}

export default Observe;