import axios from 'axios';

class ExamDefineService {
  
  async getExamDefinePage(criteria, page) {
    let response = await axios.get('/api/examDefine', { params: { criteria, ...page } })
    return response.data;
  }

}

const instance = new ExamDefineService();

export default instance;