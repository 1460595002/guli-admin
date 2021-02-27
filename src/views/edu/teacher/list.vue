<template>
  <div class="app-container">讲师列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuer.name" placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuer.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker v-model="teacherQuer.begin" type="datetime" placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="teacherQuer.end" type="datetime" placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查 询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column label="序号" width="70" align="center"> <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column label="头衔" width="80"> <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit" >修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" :page-count="total"
      style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper"
      @current-change="getList" />

  </div>
</template>

<script>
  //引入调用teacher.js文件
  import teacher from '@/api/edu/teacher'
  export default {
    //写核心代码的位置
    data() {//定义变量和初始值
      // 定义数据
      return {
        list: null, //查询后返回的数据
        page: 1,//当前页面
        total: 0,//总记录数
        limit: 5,//每页记录数
        teacherQuer: {},//条件查询封装的对象

      };
    },
    created() {//页面渲染之前，一般调用methods定义的方法
      // 当页面加载时获取数据
      this.getList();
    },

    methods: { //创建具体的方法，调用teacher.js
      getList(page = 1) {
        this.page = page;
        // 调用封装teacher的api层获取数据库中的数据
        teacher.getTecherListPage(this.page, this.limit, this.teacherQuer)
          .then(response => {//请求成功，返回数据
            console.log(response)
            this.list = response.data.rows
            console.log(response.data.total)
            this.total = response.data.total

          }).catch(err => {//请求失败 错误信息
            console.log(err)
          })
        console.log("加载列表")
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
      ,
      //清空方法
      resetData() {
        this.teacherQuer = {};
        this.getList();
      },
      //根据id删除
      removeDataById(id) {
        // debugger
        // console.log(memberId)
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          return teacher.removeById(id)
        }).then((response) => {
          console.log(response)
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((response) => { // 失败
          // console.log(response)
          if (response === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      },
    },
  };
</script>