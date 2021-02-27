import request from '@/utils/request'

export default {


    //1、讲师列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getTecherListPage(current, limit, teacherQuery) {
        const uri = 'http://localhost:8001/'
        return request({
            //    url:'/table/list/'+current+"/"+limit,
            url: `${uri}serviceedu/teacher/teacherPage/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象,后端使用RequestBody获取数据
            //data表示把对象转换json进行转递
            data: teacherQuery
        })
    },

    //添加教师
    save(teacher) {
        const uri = 'http://localhost:8001/serviceedu/teacher'
        return request({
            url: `${uri}/addTeacher`, method: 'post', data: teacher
        })

    },
    //删除教师信息
    removeById(teacherId) {
        const uri = 'http://localhost:8001/serviceedu/teacher/'
        return request({
            url: `${uri}/delete/${teacherId}`,
            method: 'delete'
        })
    },
    //获取id
    getById(id) {
        const uri = 'http://localhost:8001/serviceedu/teacher/getTeacher/'
        return request({
            url: `${uri}/${id}`,
            method: 'get'
        })

    },
    //更新老师信息
    updateById(teacher) { 
        const uri="http://localhost:8001/serviceedu/teacher/updateTeacher"
        return request({
            url: `${uri}/${teacher.id}`, method: 'put', data: teacher
        })
    }
}