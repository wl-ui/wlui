import Mock from "mockjs"
const mock_data = Mock.mock({
  "array|2000": [
    {
      name: '测试虚拟列表' + Mock.mock({
        "number|1-2000": 1
      }).number, code: 'cdd' + Mock.mock({
        "number|1-2000": 1
      }).number
    }
  ]
})
const fileList = mock_data.array

export default [
  {
    url: '/table/fileList',
    type: 'post',
    response: () => {
      return {
        code: 200,
        message: "操作成功",
        data: fileList
      }
    }
  },
]
