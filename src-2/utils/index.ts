export function resolvePath(path1, path2) {
  if (path2.startsWith('/')) {
    return path2;
  } else {
    const arr = path1.split('/');

    if (/^(\.\.\/)+/.test(path2)) {
      let length = RegExp.$1.length;
      let count = length / 3;
      while (count--) {
        arr.pop();
      }
      arr.push(path2.slice(length));
    } else if (path2.startsWith('./')) {
      arr.push(path2.slice(2));
    } else {
      arr.push(path2);
    }
    return arr.join('/');
  }
}
