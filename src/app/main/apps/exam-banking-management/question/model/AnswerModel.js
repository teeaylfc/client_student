import {FuseUtils} from '@fuse';

function AnswerModel(data)
{
  const item = data ? data : {};
  return {
    idAnswer     : item.idAnswer || FuseUtils.generateGUID(),
    checked: item.checked || false,
    answerValue   : item.answerValue || '',
    answerDescription   : item.answerDescription || '',
    answerValueMatch   : item.answerValueMatch || ''
  }
}

export default AnswerModel;
