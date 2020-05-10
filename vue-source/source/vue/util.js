const defaultReg = /\{\{((?:.|\r?\n)+?)\}\}/g
export const util = {
    getValue(vm, expr) {
        let keys = expr.split('.');
        return keys.reduce((memo, current) => {
            memo = memo[current]; // vm.shool.name
            return memo;
        }, vm)
    },
    compilerText(node, vm) { // 编译文本，替换{{school.name}}
        if (!node.expr) {
            node.expr = node.textContent; // 给节点增加了一个自定义属性，为了方便后续的更新操作
        }
        node.textContent = node.expr.replace(defaultReg, function(...args) {
            return JSON.stringify(util.getValue(vm, args[1]));
        });
    }
}

export function compiler(node, vm) {
    let childNodes = node.childNodes;
    // 将类数组转化成数组
    [...childNodes].forEach(child => {
        if (child.nodeType == 1) {
            // 递归解析
            compiler(child, vm);
        } else if (child.nodeType == 3) {
            util.compilerText(child, vm);
        }
    })
}