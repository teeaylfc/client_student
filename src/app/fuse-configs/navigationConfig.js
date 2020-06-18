const navigationConfig = [
    {
        'id': 'applications',
        'type': 'group',
        'children': [
            {
                'id': 'structure-school',
                'title': 'Quản lý trường học',
                'type': 'item',
                'icon': 'school',
                'url': '/manageSchool',
                'role': 'staff',
                'children': [

                ]
            },
            {
                'id': 'subject-management',
                'title': 'Quản lý tổ môn',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'url': '#',
                'role': 'staff',
                'children': [
                    // {
                    //     'id'   : 'manageGroupSubject',
                    //     'title': 'Quản lý tổ môn',
                    //     'type' : 'item',
                    //     'url'  : '/manageGroupSubject',
                    //     'exact': true
                    // },
                    {
                        'id': 'manageSubject',
                        'title': 'Quản lý môn học',
                        'type': 'item',
                        'url': '/manageSubject',
                        'exact': true
                    }
                ]
            },
            {
                'id': 'subject-questions',
                'title': 'Quản lý kho đề thi',
                'type': 'collapse',
                'icon': 'question_answer',
                'url': '#',
                'role': 'staff',
                'children': [

                    {
                        'id': 'manageQuestionPack',
                        'title': 'Gói câu hỏi',
                        'type': 'item',
                        'url': '/manageQuestionsPack',
                        'exact': true
                    },
                    {
                        'id': 'manageTopic',
                        'title': 'Chuyên đề',
                        'type': 'item',
                        'url': '/manageTopic',
                        'exact': true
                    },
                    {
                        'id': 'manageQuestion',
                        'title': 'Câu hỏi',
                        'type': 'item',
                        // 'url'  : '/manageQuestion',
                        'url': '/questionList',
                        'exact': true
                    },
                    {
                        'id': 'manageExamination',
                        'title': 'Đề thi/Kiểm tra',
                        'type': 'item',
                        'url': '/managerExamDefine',
                        'exact': true
                    },
                    {
                        'id': 'manageVocabulary',
                        'title': 'Từ vựng',
                        'type': 'item',
                        'url': '/manageVocabulary',
                        'exact': true
                    },
                ]
            },

            {
                'id': 'subject-setting',
                'title': 'Cài đặt',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'url': '#',
                'role': 'staff',
                'children': [
                    {
                        'id': 'manageRole',
                        'title': 'Quản lý quyền',
                        'type': 'item',
                        'url': '/manageRoles',
                        'role': 'staff',
                        'exact': true
                    },
                    {
                        'id': 'manageRoleUser',
                        'title': 'Người dùng',
                        'type': 'item',
                        'url': '/manageUser',
                        'role': 'staff',
                        'exact': true
                    }
                ]
            },

            {
                'id': 'structure-school',
                'title': 'Cấu trúc trường học',
                'type': 'collapse',
                'icon': 'school',
                'url': '#',
                'role': 'staff',
                'children': [
                    {
                        'id': 'manageSchool',
                        'title': 'Quản lý trường học',
                        'type': 'item',
                        'url': '/manageSchool',
                        'exact': true
                    },
                    {
                        'id': 'manageClass',
                        'title': 'Quản lý lớp học',
                        'type': 'item',
                        'url': '/manageClass/new',
                        'exact': true
                    },
                    {
                        'id': 'manageTeacher',
                        'title': 'Quản lý giáo viên',
                        'type': 'item',
                        'url': '/manageTeacher',
                        'exact': true
                    },
                    {
                        'id': 'manageStudent',
                        'title': 'Quản lý học sinh',
                        'type': 'item',
                        'url': '/manageStudent',
                        'exact': true
                    }
                ]
            },
            {
                'id': 'subject-management',
                'title': 'Quản lý tổ môn',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'url': '#',
                'role': 'staff',
                'children': [
                    // {
                    //     'id'   : 'manageGroupSubject',
                    //     'title': 'Quản lý tổ môn',
                    //     'type' : 'item',
                    //     'url'  : '/manageGroupSubject',
                    //     'exact': true
                    // },
                    {
                        'id': 'enterPoint',
                        'title': 'Nhập điểm',
                        'type': 'item',
                        'url': '/enterPoint',
                        'exact': true
                    },
                    {
                        'id': 'createTimeTable',
                        'title': 'Khai báo thời khóa biểu',
                        'type': 'item',
                        'url': '/createTimeTable',
                        'exact': true
                    },
                    {
                        'id': 'teacherPlan',
                        'title': 'Quản lý kế hoạch giáo viên',
                        'type': 'item',
                        'url': '/teacherPlan',
                        'exact': true
                    },
                    {
                        'id': 'teacherManagement',
                        'title': 'Quản lý giáo viên',
                        'type': 'item',
                        'url': '/teacherManagement',
                        'exact': true
                    },
                    {
                        'id': 'subjectInformation',
                        'title': 'Thông tin tổ môn',
                        'type': 'item',
                        'url': '/groupSubjectInformation',
                        'exact': true
                    },
                    {
                        'id': 'groupSubjectManagement',
                        'title': 'Quản lý tổ môn',
                        'type': 'item',
                        'url': '/groupSubjectManagement',
                        'exact': true
                    },
                    {
                        'id': 'manageSubject',
                        'title': 'Quản lý môn học',
                        'type': 'item',
                        // 'url'  : '/manageSubject',
                        'url': '/subjectManagement',
                        'exact': true
                    },
                    // {
                    //     'id'   : 'manageEnterPoint',
                    //     'title': 'Nhập điểm',
                    //     'type' : 'item',
                    //     'url'  : '/manageEnterPoint',
                    //     'exact': true
                    // }
                ]
            },
            {
                'id': 'subject-questions',
                'title': 'Quản lý kho đề thi',
                'type': 'collapse',
                'icon': 'question_answer',
                'url': '#',
                'role': 'staff',
                'children': [
                    {
                        'id': 'createExams',
                        'title': 'Tạo đề thi',
                        'type': 'item',
                        'url': '/createExams',
                        'exact': true
                    },
                    {
                        'id': 'manageQuestionPack',
                        'title': 'Gói câu hỏi',
                        'type': 'item',
                        'url': '/manageQuestionsPack',
                        'exact': true
                    },
                    {
                        'id': 'manageTopic',
                        'title': 'Chuyên đề',
                        'type': 'item',
                        // 'url'  : '/manageTopic',
                        'url': '/topicList',
                        'exact': true
                    },
                    {
                        'id': 'manageQuestion',
                        'title': 'Câu hỏi',
                        'type': 'item',
                        // 'url'  : '/manageQuestion',
                        'url': '/questionList',
                        'exact': true
                    },
                    {
                        'id': 'manageExamination',
                        'title': 'Đề thi/Kiểm tra',
                        'type': 'item',
                        // 'url'  : '/managerExamDefine',
                        'url': '/examTestConfig',
                        'exact': true
                    },
                    {
                        'id': 'manageExampleExamination',
                        'title': 'Đề thi/Kiểm tra mẫu',
                        'type': 'item',
                        'url': '/exampleExamDefine',
                        'exact': true
                    }
                ]
            },
            {
                'id': 'subject-test',
                'title': 'Tổ chức thi',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'url': '#',
                'role': 'staff',
                'children': [
                    {
                        'id': 'manageExamination',
                        'title': 'Quản lý ca thi',
                        'type': 'item',
                        'url': '/manageTestPlan',
                        'exact': true
                    },
                    {
                        'id': 'manageCheckExamination',
                        'title': 'Xử lý phúc khảo',
                        'type': 'item',
                        'url': '/manageCheckExamination',
                        'exact': true
                    }
                ]
            },

            {
                'id': 'subject-setting',
                'title': 'Cài đặt',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'url': '#',
                'role': 'staff',
                'children': [
                    {
                        'id': 'manageRole',
                        'title': 'Quản lý quyền',
                        'type': 'item',
                        'url': '/manageRoles',
                        'exact': true
                    },
                    {
                        'id': 'manageRoleUser',
                        'title': 'Người dùng',
                        'type': 'item',
                        'url': '/manageUser',
                        'exact': true
                    }
                ]
            },
            {
                'id': 'subject-confirm',
                'title': 'Phê duyệt',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'url': '#',
                'role': 'staff',
                'children': [
                    // {
                    //     'id'   : 'manageTeacherConfirm',
                    //     'title': 'Phê duyệt đăng kí giáo viên',
                    //     'type' : 'item',
                    //     'url'  : '/manageTeacherConfirm',
                    //     'exact': true
                    // },
                ]
            },
            {
                'id': 'test',
                'title': 'Thi',
                'type': 'collapse',
                'icon': 'access_time',
                'url': '#',
                'role': 'staff',
                'children': [
                    {
                        'id': 'mockTest',
                        'title': 'Thi thử',
                        'type': 'item',
                        'url': '/mockTest',
                        'exact': true
                    },
                    {
                        'id': 'doTest',
                        'title': 'Thực hiện bài thi',
                        'type': 'item',
                        'url': '/doTestList',
                        'exact': true
                    },
                    {
                        'id': 'testResult',
                        'title': 'Kết quả bài thi',
                        'type': 'item',
                        'url': '/testResult',
                        'exact': true
                    },
                    {
                        'id': 'complainTestResult',
                        'title': 'Phúc khảo',
                        'type': 'item',
                        'url': '/complainTestResult',
                        'exact': true
                    }
                ]
            },
            // menu partner

            {
                'id': 'profile-page',
                'title': 'Trang cá nhân',
                'type': 'collapse',
                'icon': 'home',
                'url': '#',
                'role': 'partner',
                'children': [
                    {
                        'id': 'dashboard',
                        'title': 'Dashboard',
                        'type': 'item',
                        'url': '/homeTeacher',
                        'exact': true
                    },
                    {
                        'id': 'profile',
                        'title': 'Thông tin cá nhân',
                        'type': 'item',
                        'url': '/profile',
                        'exact': true
                    },
                    {
                        'id': 'notification',
                        'title': 'Thông báo',
                        'type': 'item',
                        'url': '/listNoti',
                        'exact': true
                    },
                ]
            },
            {
                'id': 'class-management',
                'title': 'Quản lý lớp học',
                'type': 'collapse',
                'icon': 'school',
                'url': '/#',
                'role': 'partner',
                'children': [
                    {
                        'id': 'class-list',
                        'title': 'Danh sách lớp học',
                        'type': 'item',
                        'url': '/#',
                        'exact': true
                    },
                    {
                        'id': 'class-info',   
                        'title': 'Thông tin các lớp học',
                        'type': 'item',
                        'url': '/#',
                        'exact': true
                    },
                    {
                        'id': 'class-join',   
                        'title': 'Tham gia lớp học',
                        'type': 'item',
                        'url': '/#',
                        'exact': true
                    },
                    {
                        'id': 'class-point',   
                        'title': 'Bảng điểm từng lớp học',
                        'type': 'item',
                        'url': '/#',
                        'exact': true
                    },
                ]
            },
            {
                'id': 'lib-exam-personal',
                'title': 'Bộ đề luyện tập',
                'type': 'collapse',
                'icon': 'folder_open',
                'url': '/#',
                'role': 'partner',
                'children': [
                    {
                        'id': 'subject-list',
                        'title': 'Danh sách các môn học',
                        'type': 'item',
                        'url': '/#',
                        // 'url': '/listSubject',
                        'exact': true
                    },
                    {
                        'id': 'exam-list',
                        'title': 'Danh sách bộ đề',
                        'type': 'item',
                        'url': '/createExams',
                        'exact': true
                    },
                    {
                        'id': 'exam-downloaded',
                        'title': 'Bộ đề đã tải',
                        'type': 'item',
                        'url': '/examPersonalList',
                        'exact': true
                    },
                ]
            },
            {
                'id': 'lib-learning',
                'title': 'Nhật ký',
                'type': 'collapse',
                'icon': 'library_books',
                'url': '#',
                'role': 'partner',
                // 'children': [
                //     {
                //         'id': 'plan-registration',
                //         'title': 'Giáo án đăng ký',
                //         'type': 'item',
                //         'url': '/planRegistration',
                //         'exact': true
                //     },
                //     {
                //         'id': 'plan-individual',
                //         'title': 'Giáo án cá nhân',
                //         'type': 'item',
                //         'url': '/planIndividual',
                //         'exact': true
                //     },
                //     {
                //         'id': 'plan-share',
                //         'title': 'Giáo án chia sẻ',
                //         'type': 'item',
                //         'url': '/planShare',
                //         'exact': true
                //     },
                // ]
            },
            // {
            //     'id': 'exams-log',
            //     'title': 'Nhật ký bài kiểm tra',
            //     'type': 'collapse',
            //     'icon': 'library_books',
            //     'url': '#',
            //     'role': 'partner',
            //     'children': [
            //         {
            //             'id': 'exam-created',
            //             'title': 'Bài kiểm tra đã tạo',
            //             'type': 'item',
            //             'url': '/examCreated',
            //             'exact': true
            //         },
            //         {
            //             'id': 'exam-waiting',
            //             'title': 'Bài kiểm tra đang chờ',
            //             'type': 'item',
            //             'url': '/examWaiting',
            //             'exact': true
            //         },
            //         {
            //             'id': 'exam-complete',
            //             'title': 'Bài kiểm tra đã hoàn thành',
            //             'type': 'item',
            //             'url': '/examComplete',
            //             'exact': true
            //         },
            //     ]
            // },

        ]
    }
];

export default navigationConfig;
