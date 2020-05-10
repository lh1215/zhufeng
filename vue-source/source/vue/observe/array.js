import { observe } from "./index";

// 获取所有老的数组
let oldArrayProtoMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayProtoMethods);

let methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'splice',
    'sort',
    'reverse'
];

export function observeArray(inserted) { // 要循环数组依次对数组每一项进行观察

    for (let i = 0; i < inserted.length; i++) {
        observe(inserted[i]);
    }

}

methods.forEach(method => {
    arrayMethods[method] = function(...args) {
        let r = oldArrayProtoMethods[method].apply(this, args);

        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.splice(2);
                break;
            default:
                break;
        }

        if (inserted) observeArray(inserted);
        this.__ob__.dep.notify(); // 通知视图更新
        return r;
    }
})