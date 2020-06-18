import { SettingsConfig } from './setting/SettingsConfig';
import { StructureSchoolAppConfig } from "./structure-school/StructureSchoolAppConfig";
import { StructureSubjectAppConfig } from "./structure-subjects/StructureSubjectAppConfig";
import { ExamBankingManagementAppConfig } from "./exam-banking-management/ExamBankingManagementAppConfig";
import { ConfirmConfig } from "./structure-confirmed/ConfirmConfig";
import {ExamManagementAppConfig} from "./exam-management/ExamManagementAppConfig";

export const appsConfigs = [
    SettingsConfig,
    StructureSchoolAppConfig,
    ExamBankingManagementAppConfig,
    ExamManagementAppConfig,
    StructureSubjectAppConfig,
    ConfirmConfig,

];
