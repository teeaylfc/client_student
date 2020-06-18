import axios from 'axios';

class ExamStatusService {

  async getExamStatusesPage(criteria, page) {
    let response = await axios.get('/api/studentExamStatuses', { params: { criteria, ...page } });
    return response.data;
  }

}

const instance = new ExamStatusService();

export default instance;