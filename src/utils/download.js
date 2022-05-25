export const cleanArray = actual => actual.filter(i => !!i)

export function param(json) {
  if (!json) return ''
  for (let key in json) {
    if (!json[key] && json[key] !== 0) {
      delete json[key]
    }
  }
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * 下载文件
 * @param {String} url 下载文件的路径
 * @param {Object} params 下载文件的参数
 * @param {String} name 下载文件的名字
 */
export const downloadFile = (url, params, name) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = `${url}?${param(params)}`
  link.setAttribute('download', name)
  document.body.appendChild(link)
  console.log(link.href)
  link.click()
}