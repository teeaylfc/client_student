import {FuseUtils} from '@fuse';

function SchoolInfoModel(data)
{
  const item = data ? data : {};
  return {
    id     : item.id || FuseUtils.generateGUID(),
    citySchool: item.citySchool,
    districtSchool   : item.districtSchool || '',
    degreeNo   : item.degreeNo || '',
    idSchool   : item.idSchool || '',
    degreeNumber   : item.degreeNumber || '',
    addressSchool   : item.addressSchool || '',
  }
}

export default SchoolInfoModel;
