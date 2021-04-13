import axios from 'axios'

const service = axios.create({
    timeout: 10000 // request timeout
})
export default service
