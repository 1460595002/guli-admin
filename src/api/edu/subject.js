import request from '@/utils/request'
const api_name = '/serviceedu/subject/tree'
export default {
    getNestedTreeList() {
        return request({
            url: `http://localhost:8001${api_name}`,
            method: 'get'
        })
    }
}