import { pushTarget, popTarget } from "./dep";

let id = 0;
class Watcher {
    /**
     * 
     * @param {*} vm 当前组件的this
     * @param {*} exprOrFn  用户传入的一个表达式 也有可能传入的是一个函数
     * @param {*} cb 用户传入的回调函数
     * @param {*} opts 传入的其他参数
     */
    constructor(vm, exprOrFn, cb=()=>{}, opts={}) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn;
        }
        this.cb = cb;
        this.deps = [];
        this.depsId = new Set();
        this.opts = opts;
        this.id = id++;
        this.get();
    }
    get() {
        pushTarget(this); // 渲染watcher，传入当前watcher Dep.target = watcher msg变化了 需要让这个watcher重新执行
        // 默认创建watcher 会执行此方法
        this.getter(); // 让这个当前传入的函数执行
        popTarget();
    }
    addDep(dep) { // 同一个watcher，不应该重复记忆
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep); // 就让watcher，记住了当前的dep
            dep.addSub(this);
        }
    }
    update() { // 如果立即调用get 会导致页面立即更新 异步来更新
        queueWatcher(this);
        // this.get();
    }
    run() {
        this.get();
    }
}

let has = {};
let queue = [];

function flushQueue() {
    // 等待这一轮全部更新后，再去让watcher 依次执行
    queue.forEach(watcher => watcher.run());
    has = {};
    queue = [];
}

function queueWatcher(watcher) { // 对重复的watcher进行过滤操作
    let id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);

        nextTick(flushQueue);
    }
}

let flushCallbacks = [];
function flushCallback() {
    flushCallbacks.forEach(cb => cb());
}

function nextTick(cb) { // cb 就是 flushQueue
    flushCallbacks.push(cb);

    // 这里需要进行异步执行，（微任务：promise、MutationObserver）  （宏任务：setImmediate、setTimeout）

    let timerFunc = () => {
        flushCallback();
    }

    if (Promise) {
        return Promise.resolve().then(timerFunc);
    }
    if (MutationObserver) {
        const observe = new MutationObserver(timerFunc);
        const textNode = document.createTextNode(1);
        observe.observe(textNode, {characterData: true});
        textNode.textContent = 2;
        return;
    }
    if (setImmediate) {
        return setImmediate(timerFunc);
    }
    setTimeout(timerFunc, 0);
}   

export default Watcher;