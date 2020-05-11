import Vue from 'vue'; // 会默认先查找source下的

const vm = new Vue({
    el: document.getElementById("app"),
    data() {
        return {
            msg: 'hello',
            age: 18,
            school: {
                name: '莲塘小学',
                age: 19
            },
            money: [[9], 4, 6]
        }
    },
    computed: {},
    watch: {
        msg(newValue, oldValue) {
            console.log(newValue, oldValue);
        }
    },
});

// vue的特点就是批量更新，防止重复渲染

setTimeout(() => {
    // vm.msg = '你老';
    // vm.msg = '1111'
    // vm.msg = '1111'
    // vm.msg = '1111'
    // vm.msg = '4444'

    // vm.money[0].push(100); // 数组的依赖收集

    // ----------------------------- watcher的使用
    vm.msg = 'fdafdafsa';

}, 1000);

// 什么样的数组会被监测，[0,1,2] observe 不能直接改变数组索引不能被监测到
// [1,2,3].length-- 因为数组呃长度变化 我们没有监控