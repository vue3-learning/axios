export function copy2clipboard(value) {
  var currentFocus = document.activeElement // 保存当前活动节点

  var input = document.createElement('input') // 创建一个input标签
  document.body.appendChild(input) // 把标签添加给body
  input.style.opacity = 0 //设置input标签设置为透明(不可见)
  input.value = value // 把需要复制的值放到input上

  // 记录当前滚动位置, 因为添加节点并选中的时候会影响页面滚动
  var scrollY = window.scrollY 

  input.focus() // input节点获取焦点
  input.setSelectionRange(0, input.value.length) // 选中input框中的所有文字

  var res = document.execCommand('copy', true) // 复制文字并获取结果

  currentFocus.focus() // 之前活动节点获得焦点
  document.body.removeChild(input);// 删除添加的input节点

  // 页面滚动到之前位置
  window.scrollTo(0, scrollY);

  return res // 返回操作结果
}

// 对象深拷贝
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}