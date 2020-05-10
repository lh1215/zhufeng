let id = 0;
class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }

    addSub(watcher) { // 订阅，就是将调用addSub时传入的内容保存到数组中
        this.subs.push(watcher);
    }

    notify() {  
        this.subs.forEach(watcher => watcher.update());
    }
    depend() {
        if (Dep.target) { // 为了防止直接调用depend方法，先判断一下
            Dep.target.addDep(this); // 希望可以在watcher中互相记忆
        }
    }
}

let stack = [];
// 用来保存当前的 watcher
export function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
}

export function popTarget(watcher) {
    stack.pop();
    Dep.target = stack[stack.length-1];
}

export default Dep; // 收集一个个watcher