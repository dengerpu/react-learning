// 生成一个介于[min, max]之间的随机整数
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成一个随机长度的字符串
export function generateRandomString() {
  var length = getRandomInt(1, 30);
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// 生成随机大小的数组，数组每一项都是随机长度的字符串
export function generateRandomArray(size) {
  var array = [];
  for (var i = 0; i < size; i++) {
    array.push(generateRandomString());
  }
  return array;
}
