const readonly = (target, name, descriptor) => {
  // target:Demo
  // name:'x'
  // descriptor:{configurable: true, enumerable: true, writable: true, initializer: ƒ}
  descriptor.writable = false;
};

class Demo {
  @readonly x = 100;
}

// let d = new Demo;
// d.x = 200; //Uncaught TypeError: Cannot assign to read only property 'x' of object

const recordTime = (target, name, descriptor) => {
  let func = descriptor.value;
  if (typeof func === "function") {
      // 重构函数，做计时统计
      descriptor.value = function proxy(...params) {
          console.time(name);
          let result = func.call(this, ...params);
          console.timeEnd(name);
          return result;
      };
  }
};

class Demo2 {
  @recordTime
  init() {
      return 100;
  }
}
let d = new Demo2;
console.log(d.init());