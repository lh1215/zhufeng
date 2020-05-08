import { observe } from './index';
import { arrayMethods, observeArray } from './array';
export function defineReactive(data, key, value) { // 定义响应式的数据变化
    // 如果value依旧是object的话，需要递归
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            console.log('获取数据');
            return value;
        },
        set(newValue) {
            if (value === newValue) return;
            console.log('设置数据');
            observe(newValue); // 如果你设置的值是一个对象的话，应该进行监控
            return newValue;
        }
    })
}
class Observe {
    constructor(data) {
        if (Array.isArray(data)) { // 重写push等方法
            data.__proto__ = arrayMethods; // 把重写的方法赋值给data数组的原型链上
            observeArray(data);
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