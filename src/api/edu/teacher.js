import request from '@/utils/request'

export default {

    
    //1、讲师列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getTecherListPage(current, limit, teacherQuery) {
             const uri='http://localhost:8001/'
        return request({
            //    url:'/table/list/'+current+"/"+limit,
            url: `${uri}serviceedu/teacher/teacherPage/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象,后端使用RequestBody获取数据
            //data表示把对象转换json进行转递
            data:teacherQuery
        })
    }
}