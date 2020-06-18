import {FuseUtils} from '@fuse';

function QuestionCardModel(data)
{
  const item = data ? data : {};
  return {
    idQuestion : item.idQuestion || FuseUtils.generateGUID(),
    subject : item.subject || '',
    classRoom : item.classRoom || '',
    questionType : item.questionType || '',
    topic : item.topic || '',
    questionsPack : item.questionsPack || '',
    questionLevel : item.questionLevel || '',
    questionString : item.questionString || '',
    descriptionAnswer : item.descriptionAnswer || '',
    image : item.image || '',
    answerList : item.answerList || [],
  }
}

export default QuestionCardModel;
