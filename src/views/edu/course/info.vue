<template>

    <div class="app-container">
  
      <h2 style="text-align: center;">发布新课程</h2>
  
      <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="填写课程基本信息"/>
        <el-step title="创建课程大纲"/>
        <el-step title="提交审核"/>
      </el-steps>
  
      <el-form label-width="120px">
        <el-form-item label="课程标题">
          <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>
  
        <!-- 所属分类 TODO -->
        <!-- 一级分类 -->
        <el-form-item label="课程类别">
          <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="请选择"
            @change="subjectLevelOneChanged">
            <el-option
              v-for="subject in subjectOneList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"/>
          </el-select>
  
          <!-- 二级分类 -->
          <el-select v-model="courseInfo.subjectId" placeholder="请选择">
            <el-option
              v-for="subject in subjectTwoList"
              :key="subject.value"
              :label="subject.title"
              :value="subject.id"/>
          </el-select>
        </el-form-item>
  
        <!-- 课程讲师 TODO -->
        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
          <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">
            <el-option
              v-for="teacher in teacherList"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"/>
          </el-select>
        </el-form-item>
  
        <el-form-item label="总课时">
          <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>
  
        <!-- 课程简介 TODO -->
        <!-- 课程简介-->
        <el-form-item label="课程简介">
          <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>
  
        <!-- 课程封面 TODO -->
        <!-- 课程封面-->
        <el-form-item label="课程封面">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API+'/eduoss/file'"
            class="avatar-uploader">
            <img :src="courseInfo.cover">
          </el-upload>
        </el-form-item>
  
        <el-form-item label="课程价格">
          <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>
  
        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
  
  import course from '@/api/edu/course'
  import subject from '@/api/edu/subject'
  import Tinymce from '@/components/Tinymce'
  
  export default {
    components: { Tinymce },
    data() {
      return {
        courseInfo: {
          title: '',
          subjectId: '',
          subjectParentId: '',
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: '/static/01.jpg',
          price: 0
        },
        teacherList: [],
        subjectOneList: [], // 一级分类列表
        subjectTwoList: [], // 二级分类列表
        saveBtnDisabled: false, // 保存按钮是否禁用
        BASE_API: process.env.BASE_API // 接口API地址
      }
    },
    watch: { // 监听
      $route(to, from) { // 路由变化的方式，路由变化时就会执行
        this.init()
      }
    },
    created() {
      // 获取到路由中的id值
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        this.getCourseInfo()
      } else {
        this.getListTeacher()
        this.initSubjectList()
      }
    },
  
    methods: {
      init() {
        // 判断路径中是否有id这个参数
        if (this.$route.params && this.$route.params.id) {
        } else {
          // 路径中没有id，求情况表单
          this.courseInfo = {}
          this.courseInfo.cover = '/static/01.jpg'
        }
      },
      // 根据课程id查询课程的信息
      getCourseInfo() {
        course.getCourseInfo(this.courseId).then(response => {
          this.courseInfo = response.data.course
          // 查询所有分类
          subject.getAllSubject().then(responseSubject => {
            this.subjectOneList = responseSubject.data.list // 所有的一级分类
            for (let i = 0; i < this.subjectOneList.length; i++) {
              if (this.subjectOneList[i].id === this.courseInfo.subjectParentId) {
                this.subjectTwoList = this.subjectOneList[i].children
              }
            }
          })
          // 初始化所有讲师
          this.getListTeacher()
        })
      },
  
      // 添加课程
      addCourse() {
        course.saveCourseInfo(this.courseInfo).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 下一步跳转路由
          this.$router.push({ path: '/course/chapter/' + response.data.id })
        })
      },
  
      // 修改课程
      updateCourse() {
        course.updateCourseInfo(this.courseInfo).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 下一步跳转路由
          this.$router.push({ path: '/course/chapter/' + this.courseInfo.id })
        })
      },
  
      saveOrUpdate() {
        // 判断添加还是修改，根据courseInfo中是否有id值
        if (!this.courseInfo.id) {
          this.addCourse()
        } else {
          this.updateCourse()
        }
      },
  
      // 获取所有的讲师信息
      getListTeacher() {
        course.getListTeacher().then(response => {
          this.teacherList = response.data.items
        })
      },
      // 获取所有的一二级目录
      initSubjectList() {
        subject.getAllSubject().then(response => {
          this.subjectOneList = response.data.list
        })
      },
      // 根据一级目录，获取到对应的二级目录
      subjectLevelOneChanged(value) {
        // value：对应的一级分类的id，根据这个找对应的二级分类
        for (let i = 0; i < this.subjectOneList.length; i++) {
          if (this.subjectOneList[i].id === value) {
            this.subjectTwoList = this.subjectOneList[i].children
            this.courseInfo.subjectId = ''
          }
        }
      },
      // 上传成功
      handleAvatarSuccess(res, file) {
        // console.log(res)// 上传响应
        // console.log(URL.createObjectURL(file.raw))// base64编码
        this.courseInfo.cover = res.data.url
      },
      // 上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
  
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
  </script>
  <style scoped>
  .tinymce-container {
    line-height: 29px;
  }
  </style>