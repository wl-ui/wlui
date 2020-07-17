import http from "./__http__"

// 1获取文件夹列表
const getTableListApi = (data) => http.post({
  url: "/table/fileList",
  data
})

export {
  getTableListApi
}