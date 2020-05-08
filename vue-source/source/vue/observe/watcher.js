let id = 0;
class Watcher {
    /**
     * 
     * @param {*} vm 当前组件的this
     * @param {*} exprOrFn  
     * @param {*} cb 回调函数
     * @param {*} opts 传入的其他参数
     */
    constructor(vm, exprOrFn, cb=()=>{}, opts={}) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn;
        }
        this.cb = cb;
        this.opts = opts;
        this.id = id++;
        this.get();
    }
    get() {
        this.getter();
    }
}

export default Watcher;