<el-form label-width="120px">
    <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视
     </el-form-item> 67 <!-- 所属分类 TODO -->
     <!-- 课程讲师 TODO -->
    
     <el-form-item label=" 总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" plac 数" />
    </el-form-item>

    <!-- 课程简介 TODO -->

    <!-- 课程封面 TODO -->

    <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placehol </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-but </el-form-item>
</el-form>