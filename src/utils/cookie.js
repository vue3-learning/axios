export const getCookie = name => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  }
  else {
    return null;
  }
}

export const delCookie = name => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  //获取cookie是否存在
  var value = getCookie(name);
  if (value != null) {
    document.cookie = name + "=" + value + ";expires=" + exp.toUTCString();
  }
}