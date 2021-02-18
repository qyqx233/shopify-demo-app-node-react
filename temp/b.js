class O {
    a = 100
    constructor() {
        this.age = 100
        console.log(`age = ${this.age}`)
        this.show = this.show.bind(this)
        console.log(this.show)
    }
    add() {
        this.a++
    }
    show() {
        console.log(Object.keys(this))
        console.log(`${this.age}`)
    }
}

const o = new O()
o.add()
console.log(o.a)
o.show()

