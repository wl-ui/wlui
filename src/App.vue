<template>
  <div id="app">
    <!-- 视图组件 -->
    <wl-container>
      <template #header>
        <div class="logo-box">
          <img class="logo" src="http://wlbase.oss-cn-beijing.aliyuncs.com/wlui-logo.jpg" />
        </div>
      </template>
      <!-- 基础组件 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <h3>下拉框</h3>
          <wl-select class="width-240"></wl-select>
        </el-col>
        <el-col :span="6">
          <h3>树下拉框</h3>
          <wl-select-tree width="240px" :data="treeData" v-model="selected"></wl-select-tree>
        </el-col>
        <el-col :span="6">
          <h3>三级地址</h3>
          <wl-address class="width-240"></wl-address>
        </el-col>
        <el-col :span="6">
          <h3>校验框</h3>
          <wl-input class="width-240"></wl-input>
        </el-col>
        <el-col :span="3">
          <h3>防抖按钮</h3>
          <wl-add @click="layout.fade = true"></wl-add>
        </el-col>
        <el-col :span="3">
          <h3>右键菜单</h3>
          <p class="contextmenu-p" @contextmenu="handleContextmenu">体验区</p>
          <!-- 用在组件上要加 native 即 @contextmenu.native="" -->
          <wl-context-menu
            :visible.sync="layout.contextmenu"
            :x="contextmenu.x"
            :y="contextmenu.y"
            :menu-list="contextmenu_list"
            @rowClick="contextMenuClick"
          ></wl-context-menu>
        </el-col>
        <el-col :span="9">
          <h3>树穿梭框</h3>
          <wl-transfer-tree class="width-460"></wl-transfer-tree>
        </el-col>
        <el-col :span="9">
          <h3>动态表格</h3>
          <wl-table-dynamic class="width-460"></wl-table-dynamic>
        </el-col>
        <!-- <el-col :span="24">
          <h3>BIM模型</h3>
          <wl-bim-viewer multiple :docs="bims" class="wl-viewer"></wl-bim-viewer>
        </el-col>
        <el-col :span="24">
          <h3>Gantt甘特图</h3>
          <wl-gantt
            use-real-time
            default-expand-all
            end-date="2019-11-02"
            start-date="2019-9-06"
            date-type="monthAndDay"
            :data="ganttData"
            @timeChange="timeChange"
            @preChange="preChange"
            @expand-change="expandChange"
          ></wl-gantt>
        </el-col> -->
        <el-col :span="24">
          <h3>Explorer文件管理器云盘</h3>
          <wl-explorer
            ref="wl-explorer-cpt"
            :header-dropdown="headerHandle"
            :upload-options="uploadOptions"
            :columns="file_table_columns"
            :all-path="all_folder_list"
            :is-folder-fn="isFolderFn"
            :folderType="rource_type"
            :data="file_table_data"
            :props="explorer_prop"
            size="small"
            @handleFolder="handleFolder"
            @upload="fileUpload"
            @search="fileSearch"
            @del="fileDel"
            @closeFade="closeOtherLayout(fade)"
          >
            <!-- 操作文件夹滑入区 -->
            <fade-in v-show="fade.folder">
              <h3 class="edit-header">
                <p>{{folder_form.Id?'编辑':'新增'}}文件夹</p>
              </h3>
              <wl-scroll class="scroll">
                <el-form
                  size="medium"
                  ref="folder_form"
                  label-position="top"
                  :model="folder_form"
                  :rules="folder_rules"
                  class="folder_form rule-form"
                  @keyup.enter.native="submitFolderFrom('folder_form')"
                >
                  <el-form-item label="文件路径" prop="ParentId">
                    <wl-select-tree
                      class="u-full"
                      nodeKey="Id"
                      placeholder="请选择文件路径"
                      :props="tree_select_prop"
                      :data="tree_folder_list"
                      v-model="folder_form.ParentId"
                    ></wl-select-tree>
                  </el-form-item>
                  <el-form-item label="文件夹名称 " prop="Name">
                    <el-input v-model="folder_form.Name" placeholder="请输入文件夹名称"></el-input>
                  </el-form-item>
                  <el-form-item label="备注说明" prop="Describe">
                    <el-input
                      :rows="3"
                      type="textarea"
                      v-model="folder_form.Describe"
                      placeholder="请输入备注说明"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </wl-scroll>
              <div class="submit-btn-box">
                <submit-btn @btn="submitFolderFrom('folder_form')" :status="load.folder"></submit-btn>
                <el-button size="medium" @click="fade.folder = false">取消</el-button>
              </div>
            </fade-in>
          </wl-explorer>
        </el-col>
      </el-row>
      <!-- 滑入组件 -->
      <wl-fade-in :show="layout.fade">
        biubiubiu~
        <template #footer>
          <div>
            <el-button size="small" @click="layout.fade = false">取 消</el-button>
            <el-button size="small" @click="layout.fade = false">确 定</el-button>
          </div>
        </template>
      </wl-fade-in>
    </wl-container>
  </div>
</template>

<script>
import FadeIn from "@/components/fade-in"; // 导入文件管理器
import SubmitBtn from "@/components/submit-btn"; // 导入防抖提交组件
import { closeOtherLayout } from "@/utils"; // 导入关闭其他弹出类视图函数
import { arrayToTree } from "wl-core";
import {
  getFileListApi, // 1获取文件夹列表
  getAllFoldersApi, // 4获取全部文件夹
  delFileApi // 6删除文件|文件夹
} from "@/api/explorer"; // 导入接口
const apiok = 200;

export default {
  name: "app",
  components: { FadeIn, SubmitBtn },
  data() {
    const _GB = 1024 * 1024;

    return {
      layout: {
        fade: false,
        contextmenu: false
      },
      // ---------------------------------------------select tree
      treeData: [
        {
          children: [
            {
              name: "安全运营-子类型001",
              id: "4028dbde729c1e0301729c1fa7390001"
            },
            { name: "安全运营-子1", id: "8a8be6ac72ad7a3a0172bb37f6e40001" },
            { name: "安全运营-子2", id: "8a8be6ac72ad7a3a0172bb381bbf0002" },
            { name: "安全运营-子3", id: "8a8be6ac72ad7a3a0172bb3843e60003" }
          ],
          name: "安全运营",
          id: "4028dbde729c1e0301729c1ea1560000"
        },
        {
          children: [
            { name: "测试类型二", id: "8a8be6ac72a68ea60172a7312cf30002" },
            { name: "测试类型-子1", id: "8a8be6ac72ad7a3a0172bb38804c0004" },
            { name: "测试类型-子2", id: "8a8be6ac72ad7a3a0172bb3893d30005" },
            { name: "测试类型-子3", id: "8a8be6ac72ad7a3a0172bb38a6f50006" }
          ],
          name: "测试类型",
          id: "8a8be6ac72a68ea60172a730ef8a0001"
        },
        {
          children: [],
          name: "测试类型六",
          id: "8a8be6ac72a68ea60172a73200340003"
        }
      ],
      selected: ["8a8be6ac72ad7a3a0172bb38a6f50006"],
      // ----------------------------------------------- 右键菜单
      contextmenu: {
        x: 0,
        y: 0,
        tag: null
      },
      contextmenu_list: [
        { icon: "el-icon-back", title: "关闭左侧", value: "left" },
        { icon: "el-icon-right", title: "关闭右侧", value: "right" },
        { icon: "el-icon-close", title: "关闭其它", value: "other" },
        { icon: "el-icon-circle-close", title: "关闭全部", value: "all" }
      ],
      // -------------------------------------- bim
      bims: [
        {
          name: "urn_model1",
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo1/0.svf",
          modelObj: null
        },
        {
          name: "urn_model2",
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo2/0.svf",
          modelObj: null
        },
        {
          name: "urn_model3",
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo3/0.svf",
          modelObj: null
        },
        {
          name: "urn_model4",
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo4/0.svf",
          modelObj: null
        },
        {
          name: "urn_model5",
          path:
            "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo5/Sphere.svf",
          modelObj: null
        },
        {
          name: "urn_model6",
          path:
            "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo5/Sphere.svf",
          modelObj: null
        }
      ],
      // --------------------------------------------- gantt
      ganttData: [
        {
          id: "1",
          pid: "0",
          name: "旅行",
          startDate: "2019-09-07",
          realStartDate: "2019-09-10",
          endDate: "2019-10-31",
          realEndDate: "2019-10-19",
          children: [
            {
              id: "1-1",
              pid: "1",
              name: "云台之间",
              startDate: "2019-09-10",
              endDate: "2019-09-13",
              children: [
                {
                  id: "1-1-1",
                  pid: "1-1",
                  name: "日落云巅",
                  startDate: "2019-09-10",
                  endDate: "2019-09-13"
                }
              ]
            },
            {
              id: "1-2",
              pid: "1",
              name: "天空之镜",
              startDate: "2019-09-17",
              endDate: "2019-09-22"
            },
            {
              id: "1-3",
              name: "蓬莱之岛",
              pid: "1",
              startDate: "2019-09-25",
              endDate: "2019-09-30"
            },
            {
              id: "1-4",
              pid: "1",
              name: "西塘之南",
              startDate: "2019-10-03",
              endDate: "2019-10-07"
            },
            {
              pid: "1",
              id: "1-5",
              name: "凤凰之缘",
              startDate: "2019-10-11",
              endDate: "2019-10-19"
            }
          ]
        },
        {
          id: "2",
          name: "租房子",
          startDate: "2019-09-20",
          endDate: "2019-10-31"
        }
      ],
      // ------------------------------------------- explorer
      load: {
        folder: false
      }, // loading管理
      fade: {
        folder: false
      }, // 弹出类视图管理
      headerHandle: [{ name: "权限", command: "auth" }], // 头部按钮更多操作-自定义权限
      file_table_columns: [
        {
          label: "名称",
          prop: "Name",
          minWidth: 120
        },
        {
          label: "修改日期",
          align: "center",
          width: 120,
          formatter(row) {
            return row.EditTime.split("T")[0] || "-";
          }
        },
        {
          label: "类型",
          align: "center",
          width: 90,
          formatter(row) {
            return row.Type === 1 ? "文件夹" : row.SuffixName;
          }
        },
        {
          label: "大小",
          minWidth: 90,
          align: "center",
          formatter(row) {
            if (row.Size === null) return "-";
            if (row.Size < 1024) {
              // 1024以下显示kb
              return row.Size + "KB";
            }
            if (row.Size < _GB) {
              // 1024*1024
              let _mb = (row.Size / 1024).toFixed(2);
              return parseFloat(_mb) + "MB";
            }
            let _gb = (row.Size / _GB).toFixed(2);
            return parseFloat(_gb) + "GB";
          }
        },
        {
          label: "创建日期",
          align: "center",
          width: 120,
          formatter(row) {
            return row.CreateTime.split("T")[0] || "-";
          }
        },
        {
          label: "作者",
          minWidth: 100,
          align: "center",
          formatter(row) {
            return row.CreateUserName || "-";
          }
        },
        {
          label: "描述",
          minWidth: 100,
          formatter(row) {
            return row.Describe || "-";
          }
        }
      ], // 自定义表格列
      file_table_data: [], // 表格数据
      all_folder_list: [], // 所有文件夹列表
      tree_folder_list: [], // 树形文件夹列表
      type: {
        folder: 1,
        img: 2,
        video: 3,
        other: 4
      }, // 文件类型
      rource_type: {
        self: 1 // 自建
      }, // 数据来源类型
      explorer_prop: {
        name: "Name",
        match: "Name",
        splic: true,
        suffix: "SuffixName",
        pathId: "Id",
        pathPid: "ParentId",
        pathName: "Name",
        pathChildren: "Children", // String 路径数据 children字段
        pathConnector: "\\", // String 路径父子数据拼接连接符,默认为'\'
        pathParents: "Parents", // String 路径数据所有直系祖先节点自增长identityId逗号拼接
        pathIdentityId: "IdentityId" // String 路径数据自增长id
      }, // 文件管理器配置项
      path: {}, // 路径数据
      folder_form: {
        ParentId: "",
        Name: "",
        preview: [],
        handle: [],
        Describe: ""
      }, // 文件夹表单
      folder_rules: {
        Name: [{ required: true, message: "请填写文件夹名称", trigger: "blur" }]
      }, // 文件夹表单验证
      child_act_saved: {}, // 存储子组件数据，用于编辑更新
      tree_select_prop: {
        label: "Name",
        children: "Children"
      }, // 树形下拉框配置项
      uploadOptions: {
        aa: 1212
      } // 上传文件附加参数
    };
  },
  created() {
    this.closeOtherLayout = closeOtherLayout;
    this.getAllFolders();
    this.getFileList();
  },
  methods: {
    // ------------------------------------------ 右侧菜单
    // 标签页右键菜单
    handleContextmenu(event) {
      event.preventDefault();
      event.stopPropagation();
      this.contextmenu.tag = event.target
        .getAttribute("aria-controls")
        ?.slice(5);
      this.contextmenu.x = event.clientX;
      this.contextmenu.y = event.clientY;
      this.layout.contextmenu = true;
    },
    // 上下文菜单点击事件
    contextMenuClick(command) {
      this.layout.contextmenu = false;

      switch (command.value) {
        case "left":
          break;
        case "right":
          break;
        case "other":
          break;
        case "all":
          break;
        default:
          break;
      }
    },
    // ----------------------------------------------- gantt
    /**
     * 时间发生更改
     * row: Object 当前行数据c
     */
    timeChange(row) {
      console.log("时间修改:", row);
    },
    /**
     * 前置任务发生更改
     * row: Object 当前行数据
     * oldval: [String, Array] 前置修改前的旧数据
     * handle: Boolean 是否用户编辑产生的改变
     */
    preChange(row, oldval, handle) {
      console.log("前置修改:", row, oldval, handle);
    },
    // 数表展开行
    expandChange(row, expanded) {
      console.log("展开行:", row, expanded);
    },
    // ---------------------------------------------------------- explorer
    /**
     * @name 上传文件提交操作
     */
    fileUpload(file, cb) {
      this.uploadOptions.bb = 1;
      cb();
    },
    /**
     * 根据关键词搜索文件
     * file: Object 文件属性
     * update: Boolean 数据是否需要更新（不需要表示已存在）
     */
    fileSearch(file, update) {
      if (update) {
        this.path = file;
        this.getFileList();
      }
    },
    // 获取文件夹列表
    getFileList() {
      getFileListApi().then(({ data }) => {
        if (data.code === apiok) {
          this.file_table_data = data.data || [];
        }
      });
    },
    /**
     * 编辑文件夹
     * act:Object 当前选中文件夹
     * type:String 操作类型 add添加edit编辑
     * file:Object 当前路径信息
     */
    handleFolder(act, type, file) {
      this.path = file;
      this.fade.folder = true;
      if (type === "add") {
        this.$refs["folder_form"].resetFields();
        this.folder_form.Id = "";
        this.folder_form.ParentId = file.id;
        return;
      }
      this.child_act_saved = act;
      this.folder_form = { ...act };
    },
    // 提交文件夹表单
    submitFolderFrom(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.load.folder = true;
          setTimeout(() => {
            this.load.folder = false;
            // let res_data = data.Data;
            let res_data = this.folder_form; // 由表单数据模拟服务器返回数据，此处应有服务器返回对应实体
            res_data.EditTime = res_data.CreateTime = "2019-11-11T11:11:11";
            res_data.Type = 1;
            if (!this.folder_form.Id) {
              // 新增
              if (this.folder_form.ParentId === this.path.id) {
                // 新增到当前路径
                this.file_table_data.unshift(res_data);
              } else {
                // 新增其他路径
                let _new_data = {
                  id: res_data.Id,
                  pid: res_data.ParentId,
                  path: res_data.Name
                };
                this.$refs["wl-explorer-cpt"].updateHistoryData(
                  { Id: res_data.ParentId },
                  [_new_data]
                );
              }
            } else {
              // 编辑
              this.child_act_saved.Name = res_data.Name;
              this.child_act_saved.Describe = res_data.Describe;
            }
            this.fade.folder = false;
            this.$message({
              showClose: true,
              message: "操作成功",
              type: "success"
            });
          }, 1000);
        } else {
          return false;
        }
      });
    },
    // 删除文件
    fileDel(data) {
      let cannot_del_data = []; // 收集不可删除数据
      let normal_data_file = []; // 收集可删除文件
      let normal_data_folder = []; // 收集可删除文件夹
      data.forEach(i => {
        i.RourceType !== this.rource_type.self
          ? cannot_del_data.push(i) // 不可删除数据
          : i.Type === this.type.folder
          ? normal_data_folder.push(i.Id) // 可删除文件夹
          : normal_data_file.push(i.Id); // 可删除文件
      });
      // 不可删除数据进行提示
      if (cannot_del_data.length > 0) {
        let _msg = '<p class="title">以下文件或文件夹不可删除，已自动过滤</p>';
        cannot_del_data.forEach(i => {
          _msg += `<p class="msg">${i.Name}</p>`;
        });
        this.$message({
          dangerouslyUseHTMLString: true,
          showClose: true,
          message: _msg,
          type: "warning",
          customClass: "mulit-msg"
        });
      }
      if (normal_data_folder.length === 0 && normal_data_file.length === 0)
        return;
      // 可删除数据正常删除
      let _data = {
        FolderIds: normal_data_folder,
        FolderFileIds: normal_data_file
      };
      delFileApi(_data).then(({ data }) => {
        if (data.StatusCode === apiok) {
          this.file_table_data = this.file_table_data.filter(
            i => ![...normal_data_file, ...normal_data_folder].includes(i.Id)
          );
          this.$message({
            showClose: true,
            message: data.Message,
            type: "success"
          });
        }
      });
    },
    // 获取所有文件夹
    getAllFolders() {
      getAllFoldersApi().then(({ data }) => {
        if (data.StatusCode === apiok) {
          this.all_folder_list = data.Data || [];
          let _list = [...this.all_folder_list];
          let options = {
            id: this.explorer_prop.pathId,
            pid: this.explorer_prop.pathPid,
            children: "Children"
          };
          this.tree_folder_list = arrayToTree(_list, options);
        }
      });
    },
    // 判断是否文件夹函数
    isFolderFn(row) {
      return row.Type === this.type.folder;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 25px 0;
  padding: 20px;

  .logo-box {
    text-align: center;
    > .logo {
      width: 240px;
    }
  }

  .width-240 {
    width: 240px;
  }
  .width-440 {
    width: 440px;
  }

  .el-col {
    margin-bottom: 25px;
  }

  .contextmenu-p {
    background-color: #2c3e50;
    line-height: 36px;
    border-radius: 5px;
    color: #fff;
    text-align: center;
  }

  .wl-viewer {
    height: 400px;
    width: 90%;
    margin: 4% auto 0;
  }

  .wl-explorer {
    height: 700px;
  }
}
</style>
