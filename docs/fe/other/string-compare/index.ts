/**
 * 生成器函数，生成一个迭代器
 * @param str
 */
function* walk(str: string) {
  let s = "";
  for (let c of str) {
    if (c === "-") {
      yield Number(s);
      s = "";
    } else {
      s += c;
    }
  }
  if (s) {
    yield Number(s);
  }
}

function compare(s1: string, s2: string) {
  const iter1 = walk(s1);
  const iter2 = walk(s2);

  while (true) {
    const v1 = iter1.next();
    const v2 = iter2.next();

    // 两个都结束了，就相等
    if (v1.done && v2.done) {
      return 0;
    }

    // v1 先结束，s1 < s2
    if (v1.done) {
      return -1;
    }

    // v2 先结束，s1 > s2
    if (v2.done) {
      return 1;
    }

    if (v1.value > v2.value) {
      return 1;
    }

    if (v1.value < v2.value) {
      return -1;
    }
  }
}
