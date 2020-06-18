import {FuseUtils} from '@fuse';

function ExamDefineTopicPointModel(data)
{
  const item = data ? data : {};
  return {
    id     : item.id || FuseUtils.generateGUID(),
    topicName: item.topicName,
    numberEasyQuestion   : item.numberEasyQuestion || '',
    numberMediumQuestion   : item.numberMediumQuestion || '',
    numberHardQuestion   : item.numberHardQuestion || '',
  }
}

export default ExamDefineTopicPointModel;
