import {FuseUtils} from '@fuse';

function ExamDefineDetailModel(data)
{
  const item = data ? data : {};
  return {
    id     : item.id || FuseUtils.generateGUID(),
    point: item.point,
    questionType   : item.questionType || '',
    questionsPack   : item.questionsPack || '',
    topicPointList   : item.topicPointList || [],
  }
}

export default ExamDefineDetailModel;
