import axios from 'axios';
import store, { persistConfig } from '../store';
import { persistStore, getStoredState } from 'redux-persist';
let instance;

getStoredState(persistConfig).then(store => {
  instance = axios.create({
    baseURL: "http://171.244.0.59:4000/",
    // timeout: constants.SERVER_TIMEOUT,
    headers: {
      'Authorization': "Bearer " + store.auth.login.user.access_token,
    }
  });
})

class DataService {

  async getQuestionList(page) {
    let response = await instance.get('/api/question/list/getAll', null)
    return response.data;
  }
  async getTopicListBySchoolId(schoolId, userID) {
    let response = await instance.get(`/api/topics/school/${schoolId}/${userID}`, null)

    return response.data;
  }

  async getInfoTeacher(teacherId) {
    let response = await instance.get(`/api/teacher/${teacherId}`, null)
    return response.data;
  }
  async getListNotiTeacher() {
    let response = await instance.get(`/api/notification/teacher/list`, null)
    console.log("response")
    console.log(response)
    return response.data;
  }
  async getListProvince() {
    let response = await instance.get(`/api/location/province`, null)
    return response.data;
  }
  async getListDistrict(provinceID) {
    let response = await instance.get(`/api/location/district/${provinceID}`, null)
    return response.data;
  }
  async getListSchool(provinceID, districtID) {
    let response = await instance.get(`/api/schools/location/${provinceID}?district=${districtID}`, null)
    console.log('list scholll')
    console.log(response)
    return response.data;
  }

  async getClassesByTeacherIdSchoolID(teacherID, schoolID) {
    console.log("response")
    let response = await instance.get(`/api/classes/teacher/${teacherID}/${schoolID}`, null)
    console.log(response)
    return response.data;
  }
  async getClassesRank(classID, schoolID) {
    let response = await instance.get(`api/activityLog/getByClassId/${classID}/${schoolID}`, null)
    
    return response.data;
  }

  

  async getSetOfQuestions(teacherID, schoolID) {
    console.log("response")
    console.log(teacherID + "---" + schoolID)
    let response = await instance.get(`/api/questionsPack/${schoolID}/${teacherID}`, null)
    console.log(response)
    return response.data;
  }
  async filterQuestionPack(params) {
    let response = await instance.get(`/api/questionsPack/list/getAll`, {params: params})
    return response.data;
  }



  async getDetailQuestionPack(questionPackID) {
    let response = await instance.get(`api/question/getByQuestionPack/${questionPackID}`, null)
    return response.data;
  }
  async getDetailExamDefine(id) {
    let response = await instance.get(`api/examDefine/${id}`, null)
    return response.data;
  }
  async getDetailClass(classID) {
    let response = await instance.get(`/api/classes/${classID}`, null)
    return response.data;
  }

  async getListStudentInClass(classID, schoolID) {
    let response = await instance.get(`/api/student/list/getAll?classId=${classID}&schoolId=${schoolID}`, null)
    return response.data;
  }

  async getListAllSubjects() {
    let response = await instance.get(`/api/subject/list/getAll`, null)
    return response.data;
  }

  async editInfoClass(params) {
    let response = await instance.put(`/api/classes`, params)
    return response.data;
  }

  async createClass(params) {
    let response = await instance.post(`/api/classes`, params)
    return response.data;
  }

  async getConstants() {
    let response = await instance.get(`/api/mobile/constants`, null)
    return response.data;
  }
  async getExamDefine(id) {
    let response = await instance.get(`/api/examDefine/${id}`, null)
    return response.data;
  }

  async getListExams(grade, subjectID) {
    // let response = await instance.get(`/api/examDefine?schoolId=${schoolID}&userCreate=tuannm3105&degreeNumber=${grade}&subject=${subjectID}`, null)
    let response = await instance.get(`/api/examDefine?schoolId=SS001&degreeNumber=${grade}&subject=${subjectID}`, null)
    return response.data;
  }

  async createQuestion(params) {
    let response = await instance.post(`/api/question/saveQuestion`, params)
    return response.data;
  }

  async addStudentIntoClass(studentCode, params) {
    let response = await instance.put(`/api/classes/addStudent/${studentCode}`, params)
    return response.data;
  }
  async createExam(params) {
    let response = await instance.post(`/api/examDefine/addExamDefine`, params)
    return response.data;
  }
  async deleteExam(id) {
    let response = await instance.delete(`/api/examDefine/${id}`, null)
    return response.data;
  }
  async deleteQuestion(id) {
    let response = await instance.delete(`/api/question/${id}`, null)
    return response.data;
  }
  async deleteQuestionPack(id) {
    let response = await instance.delete(`/api/questionsPack/delete/${id}`, null)
    return response.data;
  }
  async examSharedFromMine(userId) {
    let response = await instance.get(`/api/examDefineShare?userCreate=${userId}`, null)
    return response.data;
  }
  async examSharedFromUser(userId) {
    let response = await instance.get(`/api/examDefineShare?sharedUser=${userId}`, null)
    return response.data;
  }
  async getSearchUser(txtSearch) {
    let response = await instance.get(`/api/users/list/getAll?search=${txtSearch}`, null)
    return response.data;
  }
  async getStudentPointLog(id) {
    let response = await instance.get(`/api/studentExamStatuses/student/${id}`, null)
    return response.data;
  }
  async getContact() {
    let response = await instance.get(`/api/contactUser/getByUserId`, null)
    return response.data;
  }
  async addContact(params){
    let response = await instance.post(`/api/contactUser/addContact`, params)
    return response.data;
  }
  async shareExamToUser(params){
    let response = await instance.post(`api/examDefineShare/shareExamDefine`, params)
    return response.data;
  }
  async examEditName(newName,id){
    var body = {
      nameExam : newName
    }
    let response = await instance.put(`api/examDefine/changeName/${id}`, body)
    return response.data;
  }
  async createQuestionPack(params) {
    let response = await instance.post(`api/questionsPack/saveQuestionsPack`, params)
    return response.data;
  }

  async getClassByGrade(schoolId, grade, teacherId) {
    let response = await instance.get(`/api/classes/info?schoolId=${schoolId}&groupClass=${grade}&teacherId=${teacherId}`, null)
    return response.data;
  }

  async filterListExams(params){
    let response = await instance.get(`api/examDefine`, {params: params})
    return response.data;
  }
  
  async shareExam(id, params){
    let response = await instance.put(`api/examDefine/share/${id}`, params)
    return response.data;
  }


  async signUp(params) {
    let response = await instance.post(`/api/users/register`, params)
    console.log(response)
    return response.data;
  }
}

const dataService = new DataService();

export default dataService;