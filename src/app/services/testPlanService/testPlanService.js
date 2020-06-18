import examDefineService from '../examDefineService';
import examStatusService from '../examStatusService';

class TestPlanService {

  async getTestPlans(criteria, page) {
    let examDefinePage = await examDefineService.getExamDefinePage(criteria, page);
    return examDefinePage;
  }

  async getTestStatuses(testId, page) {
    let criteria = { examIdDefine: testId };
    let examStatusPage = await examStatusService.getExamStatusesPage(criteria, page);
    return examStatusPage;
  }

}

const instance = new TestPlanService();

export default instance;

