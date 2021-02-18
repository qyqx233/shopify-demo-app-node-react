obj = {
    a: 0,
    add() {
        this.a += 1
    },
    minus() {
        this.a -= 1
    }
}

// add = obj.add.bind(obj)
obj.add()
obj1 = Object.assign({}, obj)
// add()
obj1.add()
console.log(obj1)
obj1.minus()
console.log(obj1)