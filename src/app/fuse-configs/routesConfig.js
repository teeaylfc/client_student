import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {appsConfigs} from 'app/main/apps/appsConfigs';
import {LoginConfig} from 'app/login/LoginConfig';
import {RegisterConfig} from 'app/register/RegisterConfig';
import { ResetPasswordPageConfig } from 'app/forgot-password/ResetPasswordPageConfig';
import { SignUpConfig } from '../sign-up/SignUpConfig';
import { CreateExamConfig } from '../lib-exams-personal/create-exams/CreateExamConfig';
import { CreateExamStepConfig } from '../lib-exams-personal/create-exams/create-exam-step/CreateExamStepConfig'
import { EditExamConfig } from '../lib-exams-personal/create-exams/create-exam-step/EditExamConfig'
import { EnterPointConfig } from '../enter_point/EnterPointConfig';
import { CreateTimeTableConfig } from '../create-time-table/CreateTimeTableConfig';
import { TeacherPlanConfig } from '../teacher-plan/TeacherPlanConfig';
import { TeacherManagementConfig } from '../teacher-management/TeacherManagementConfig';
import { GroupSubjectInformationConfig } from '../group-subject-info/GroupSubjectInformationConfig';
import { GroupSubjectManagementConfig } from '../group-subject-management/GroupSubjectManagementConfig'
import { CreateExamDoneConfig } from '../create-exam-done/CreateExamDoneConfig';
import { SubjectManagementConfig } from '../subject-management/SubjectManagementConfig';
import { ExamTestConfig } from '../lib-exams-personal/exam-test/ExamTestConfig';
import { QuestionListConfig } from '../lib-exams-personal/question-list/QuestionListConfig';
import { TopicListConfig } from '../topic-list/TopicListConfig';
import { ProfileConfig } from '../home-teacher/profile/ProfileConfig';
import { ListNotiConfig } from '../home-teacher/notification/ListNotiConfig';
import { ClassListConfig } from '../class-management/class-list/ClassListConfig'
import { ClassDetailConfig } from '../class-management/class-list/ClassDetailConfig'
import { ExamPersonalListConfig } from '../lib-exams-personal/exam-personal-list/ExamPersonalListConfig';
import { CreateTopicConfig } from '../lib-exams-personal/create-topic/CreateTopicConfig';
import { CreateQuestionConfig } from '../lib-exams-personal/create-question/CreateQuestionConfig';
import { ExamCreatedConfig } from '../exams-log/ExamCreatedConfig';
import { ExamWaitingConfig } from '../exams-log/ExamWaitingConfig';
import { ExamCompleteConfig } from '../exams-log/ExamCompleteConfig';
import { ListExamsSharedConfig } from '../lib-exams-personal/list-exams-share/ListExamsSharedConfig';
import { ViewAllExamSharedConfig } from '../lib-exams-personal/list-exams-share/ViewAllExamSharedConfig.js';
import { ExamSharedFromUserConfig } from '../lib-exams-personal/list-exams-share/ExamSharedFromUserConfig.js';
import { CreateClassConfig } from '../class-management/create-class/CreateClassConfig';
import { StudentInfoConfig } from '../class-management/class-list/StudentInfoConfig';
import { BackgroundCreateClassConfig } from '../class-management/create-class/BackgroundCreateClassConfig';
import { QuestionsPackConfig } from '../lib-exams-personal/questions-pack/QuestionsPackConfig';
import { QuestionPackDetailConfig } from '../lib-exams-personal/questions-pack/QuestionPackDetailConfig';
import { ListSubjectsConfig } from '../lib-exams-ss/ListSubjectsConfig';
import { ListClassInSubjectConfig } from '../lib-exams-ss/list-class-in-subject/ListClassInSubjectConfig';
import { ListExamsConfig } from '../lib-exams-ss/list-exams/ListExamsConfig';
import { CreateQuestionPackConfig } from '../lib-exams-personal/questions-pack/CreateQuestionPackConfig';
import { SignInConfig } from '../sign-up/SignInConfig';
import { ViewExamConfig } from '../lib-exams-personal/exam-personal-list/ViewExamConfig'

const routeConfigs = [
    ...appsConfigs,
    LoginConfig,
    RegisterConfig,
    SignUpConfig,
    ResetPasswordPageConfig,
    CreateExamConfig,
    CreateExamStepConfig,
    EnterPointConfig,
    CreateTimeTableConfig,
    TeacherPlanConfig,
    TeacherManagementConfig,
    GroupSubjectInformationConfig,
    GroupSubjectManagementConfig,
    CreateExamDoneConfig,
    SubjectManagementConfig,
    ExamTestConfig,
    QuestionListConfig,
    TopicListConfig,
    ProfileConfig,
    ListNotiConfig,
    ClassListConfig,
    ExamPersonalListConfig,
    CreateTopicConfig,
    CreateQuestionConfig,
    ClassDetailConfig,
    ExamCreatedConfig,
    ExamWaitingConfig,
    ExamCompleteConfig,
    ListExamsSharedConfig,
    CreateClassConfig,
    StudentInfoConfig,
    BackgroundCreateClassConfig,
    QuestionsPackConfig,
    QuestionPackDetailConfig,
    ListSubjectsConfig,
    ListClassInSubjectConfig,
    ListExamsConfig,
    CreateQuestionPackConfig,
    SignInConfig,
    EditExamConfig,
    ViewExamConfig,
    ViewAllExamSharedConfig,
    ExamSharedFromUserConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        component: () => <Redirect to="/signIn"/>
    },
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];

export default routes;
