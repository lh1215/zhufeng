import Vue from 'vue'; // 会默认先查找source下的

const vm = new Vue({
    el: '#app',
    data() {
        return {
            name: '分单发',
            age: 18,
            other: {
                name: '111',
                age: 19
            },
            money: [{a: '333'}, 4, 6]
        }
    },
    computed: {},
    watch: {},
});

console.log('==>>', vm, vm.money.push(10), vm.money[0].a = 50, vm.money[0].a);

// 什么样的数组会被监测，[0,1,2] observe 不能直接改变数组索引不能被监测到
// [1,2,3].length-- 因为数组呃长度变化 我们没有监控