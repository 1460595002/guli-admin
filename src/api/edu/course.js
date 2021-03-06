import request from '@/utils/request'
const api_name = '/admin/edu/course'
export default { //POST /admin/edu/course/save-course-info
    saveCourseInfo(courseInfo) {
        return request({
            url: `${api_name}/save-course-info`, method: 'post',
            data: courseInfo
        })
    },
    // 查询所有的讲师
    getListTeacher() {
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get'
        })
    },
    // 根据id查询课程的基本信息
    getCourseInfo(courseId) {
        return request({
            url: `/eduservice/course/getCourseInfo/${courseId}`,
            method: 'get'
        })
    },
    // 修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    // 课程确认信息的展示
    getPublishInfo(id) {
        return request({
            url: `/eduservice/course/getPublishInfo/${id}`,
            method: 'get'
        })
    },
    // 课程最终的发布
    publishCourse(id) {
        return request({
            url: `/eduservice/course/publishCourse/${id}`,
            method: 'get'
        })
    },
    // 查询所有的课程信息
    getPageList(page, limit, searchObj) {
        return request({
            url: `/eduservice/course/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    // 删除课程信息
    removeById(id) {
        return request({
            url: `/eduservice/course/deleteCourse/${id}`,
            method: 'delete'
        })
    }
}