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
            money: [{a: '莲塘小学'}, 4, 6]
        }
    },
    computed: {},
    watch: {},
});

console.log('==>>', vm.money);

// 什么样的数组会被监测，[0,1,2] observe 不能直接改变数组索引不能被监测到
// [1,2,3].length-- 因为数组呃长度变化 我们没有监控