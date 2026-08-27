class Greeter {
    greeting: string;
    constructor(greeting: string) {
        this.greeting = greeting;
    }
    
    public greet(msg: string) {
        // 修复：使用入参 msg，不是 this.msg
        return "[" + this.greeting + "] Hello, " + msg;
    }
}
let greeter = new Greeter("world");

// 命名导出
export { greeter };
