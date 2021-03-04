<template>
    <div class="app-container">
        讲师表单

        <template>
            <div class="app-container">
                <el-form label-width="120px">
                    <el-form-item label="讲师名称">
                        <el-input v-model="teacher.name" />
                    </el-form-item>
                    <el-form-item label="讲师排序">
                        <el-input-number v-model="teacher.sort" controls-position="right" :min="1" :max="10" />
                    </el-form-item>
                    <el-form-item label="讲师头衔">
                        <el-select v-model="teacher.level" clearable placeholder="请选择">
                            <!--
           数据类型一定要和取出的json中的一致，否则没法回填
          因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
                            <el-option :value="1" label="高级讲师" />
                            <el-option :value="2" label="首席讲师" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="讲师资历">
                        <el-input v-model="teacher.career" />
                    </el-form-item>
                    <el-form-item label="讲师简介">
                        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
                    </el-form-item>
                    <!-- 讲师头像：TODO -->
                    <!-- 讲师头像 -->
                    <el-form-item label="讲师头像">

                        <!-- 头衔缩略图 -->
                        <pan-thumb :image="teacher.avatar" />
                        <!-- 文件上传按钮 -->
                        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
                        </el-button>

                        <!--
    v-show：是否显示上传组件
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    :url：后台上传的url地址
    @close：关闭上传组件
    @crop-upload-success：上传成功后的回调 -->
                        <image-cropper v-show="imagecropperShow" :width="300" :height="300" :key="imagecropperkey"
                            :url="BASE_API+'/admin/oss/file/upload'" field="file" @close="close"
                            @crop-upload-success="cropSuccess" />

                    </el-form-item>
 
                    <el-form-item>
                        <!-- disabled预防重复提交 -->
                        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </div>
</template>


<script>
    import teacher from '@/api/edu/teacher'
    import ImageCropper from '@/components/ImageCropper'
    import PanThumb from '@/components/PanThumb'

    //引入调用teacher.js文件
    export default {
        components: { ImageCropper, PanThumb },
        data() {
            return {
                teacher: {
                    name: '',
                    sort: 0,
                    level: 1,
                    career: '',
                    intro: '',
                    avatar: ''//头像
                },
                imagecropperShow: false,//上传弹窗是否显示
                imagecropperkey: 0,//上传组件key的值 
                saveBtnDisabled: false, // 保存按钮是否禁用,
                // 获取地址  
               // BASE_API: process.env.BASE_API,
            BASE_API: "http://localhost:9001",
            }
        },
        created() { //页面渲染之前执行 只会执行一次
            this.init();
          console.log(process.env.BASE_API)
        },
        watch: {
            $route(to, form) { //路由变化方式，路由发生变化，方法就会执行

                this.init();
            }
        },
        methods: {
            close() { //关闭上传组件
                this.imagecropperShow = false
                // // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
                console.log("imagecropperKey",this.imagecropperKey)
                this.imagecropperKey = this.imagecropperKey + 1
            },
            cropSuccess(data) { //图片上传成功后保存
                this.imagecropperShow = false
                this.teacher.avatar = data.url
               // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
               console.log("imagecropperKey",this.imagecropperKey)
                this.imagecropperKey = this.imagecropperKey + 1
            },
            init() { //监听  通过监听能监听到路由的变化
                //route.params：判断路径中是否有id值
                if (this.$route.params && this.$route.params.id) {
                    //从路径中获取id
                    const id = this.$route.params.id
                    //根据id进行查询教师信息
                    this.fetchDataById(id)
                } else {
                    //清空表单
                    this.teacher = {}
                }
             
            },

            //提交添加教师
            saveOrUpdate() {
                this.saveBtnDisabled = true
                this.saveData()
            },
            //添加教师方法
            saveData() {
                
                teacher.save(this.teacher).then(response => {
                    return this.$message({
                        type: 'success', message: '保存成功!'
                    })
                }).then(resposne => {
                    //重定向页面
                    this.$router.push({ path: '/edu/teacher' })
                }).catch((response) => {
                    // console.log(response)
                    this.$message({
                        type: 'error',
                        message: '保存失败'
                    })
                })
            },
            //根据id进行查询
            fetchDataById(id) {
                teacher.getById(id).then(response => {
                    console.log(response)
                    this.teacher = response.data.data
                }).catch((response) => {
                    this.$message({
                        type: 'error', message: '获取数据失败'
                    })
                })
            },
            //根据id更新
            updateData() {
                this.saveBtnDisabled = true
                teacher.updateById(this.teacher).then(response => {
                    return this.$message({
                        type: 'success', message: '修改成功!'
                    })
                }).then(resposne => {
                    //重新路由到组件
                    this.$router.push({ path: '/edu/teacher' })
                }).catch((response) => {
                    // console.log(response)
                    this.$message({
                        type: 'error',
                        message: '保存失败'
                    })
                })
            },
            //判断保存或者修改
            saveOrUpdate() {
                //如果有teacher的id则是修改否则是添加

                if (!this.teacher.id) {
                    this.saveData();
                } else {
                    this.updateData()
                }
            }
        }
    }


</script>