module.exports = {
    TYPE_PARENT_NOTIFICATION : "PH",
    TYPE_STUDENT_NOTIFICATION : "HS",
    TYPE_EMAIL : "email",
    TYPE_USER_SYSTEM : "system",
    TYPE_EXAM_PARENT : "PH",
    TYPE_EXAM_TEACHER : "GV",
    TYPE_TIME_ENABLE_CALCULATOR_POINT: ["15","45","SEMESTER"],
    TYPE_TIME_15_MINUTES : "15",
    TYPE_TIME_45_MINUTES : "45",
    TYPE_TIME_SEMESTER : "SEMESTER",
    TYPE_TOPIC_GRAMMAR : "Ngữ pháp tiếng Anh",
    TYPE_TOPIC_VOCABULARY: "Từ vựng tiếng Anh",
    BASE_IMAGE_URL: "/api/images/",
    TYPE_TOPIC_EN : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "EN_GRAMMAR",
            label: "Ngữ pháp tiếng Anh"
        },
        {
            value: "EN_VOCABULARY",
            label: "Từ vựng tiếng Anh"
        },
    ],
    TYPE_TIME_EXAM : [
        {
            value: "15",
            label: "15 phút"
        },
        {
            value: "45",
            label: "45 phút"
        },
        {
            value: "SEMESTER",
            label: "Học Kỳ"
        },
    ],
    DEGREE_CLASS_1 : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "1",
            label: "1"
        },
        {
            value: "2",
            label: "2"
        },
        {
            value: "3",
            label: "3"
        },
        {
            value: "4",
            label: "4"
        },
        {
            value: "5",
            label: "5"
        }
    ],
    DEGREE_CLASS_2 : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "6",
            label: "6"
        },
        {
            value: "7",
            label: "7"
        },
        {
            value: "8",
            label: "8"
        },
        {
            value: "9",
            label: "9"
        }
    ],
    DEGREE_CLASS_3 : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "10",
            label: "10"
        },
        {
            value: "11",
            label: "11"
        },
        {
            value: "12",
            label: "12"
        }
    ],
    DEGREE_CLASS : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "1",
            label: "1"
        },
        {
            value: "2",
            label: "2"
        },
        {
            value: "3",
            label: "3"
        },
        {
            value: "4",
            label: "4"
        },
        {
            value: "5",
            label: "5"
        },
        {
            value: "6",
            label: "6"
        },
        {
            value: "7",
            label: "7"
        },
        {
            value: "8",
            label: "8"
        },
        {
            value: "9",
            label: "9"
        },
        {
            value: "10",
            label: "10"
        },
        {
            value: "11",
            label: "11"
        },
        {
            value: "12",
            label: "12"
        }
    ],
    TYPE_CLASS: [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "CB",
            label: "Ban Cơ Bản"
        },
        {
            value: "NC",
            label: "Ban Nâng Cao"
        },
        {
            value: "NK",
            label: "Năng Khiếu"
        }
    ],
    PROFESSIONAL_CLASS : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: true,
            label: "Có"
        },
        {
            value: false,
            label: "Không"
        }
    ],
    STATUS_TEACHER : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "A",
            label: "Đang giảng dạy"
        },
        {
            value: "I",
            label: "Đã nghỉ dạy"
        },
        {
            value: "C",
            label: "Đình chỉ"
        }
    ],
    DEGREE_TEACHER : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "CN",
            label: "Cử nhân sư phạm"
        },
        {
            value: "THS",
            label: "Thạc sĩ"
        },
        {
            value: "TS",
            label: "Tiến sĩ"
        }
    ],
    GENDER_DROP_DOWN : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "M",
            label: "Nam"
        },
        {
            value: "F",
            label: "Nữ"
        },
    ],

    TABLE_HEADERS_TEACHER : [
        {
            id            : 'teacherId',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã đăng nhập',
            sort          : true
        },
        {
            id            : 'teacherId',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã giáo viên',
            sort          : true
        },
        {
            id            : 'nameTeacher',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên giáo viên',
            sort          : true
        },
        {
            id            : 'birthdayTeacher',
            align         : 'left',
            disablePadding: false,
            label         : 'Ngày sinh',
            sort          : true
        },
        {
            id            : 'genderTeacher',
            align         : 'right',
            disablePadding: false,
            label         : 'Giới tính',
            sort          : true
        },
        {
            id            : 'phoneTeacher',
            align         : 'right',
            disablePadding: false,
            label         : 'Số điện thoại',
            sort          : true
        },
        {
            id            : 'emailTeacher',
            align         : 'right',
            disablePadding: false,
            label         : 'Email',
            sort          : true
        },
        {
            id            : 'subjectName',
            align         : 'right',
            disablePadding: false,
            label         : 'Môn phụ trách',
            sort          : true
        },
        {
            id            : 'degreeTeacher',
            align         : 'right',
            disablePadding: false,
            label         : 'Bằng cấp',
            sort          : true
        },
        {
            id            : 'statusTeacher',
            align         : 'right',
            disablePadding: false,
            label         : 'Trạng thái',
            sort          : true
        },
        {
            id            : '',
            align         : 'right',
            disablePadding: false,
            label         : '#',
            sort          : false
        }
    ],

    TABLE_HEADERS_CLASS : [
        {
            id            : 'groupOfClass',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên khối',
            sort          : true
        },
        {
            id            : 'idClass',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã lớp',
            sort          : true
        },
        {
            id            : 'nameClass',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên lớp',
            sort          : true
        },
        {
            id            : 'totalStudent',
            align         : 'right',
            disablePadding: false,
            label         : 'Sĩ số',
            sort          : true
        },
        {
            id            : 'teacherManage',
            align         : 'right',
            disablePadding: false,
            label         : 'Giáo viên chủ nhiệm',
            sort          : true
        },
        {
            id            : 'professionalClass',
            align         : 'right',
            disablePadding: false,
            label         : 'Lớp chuyên',
            sort          : true
        },
        {
            id            : '',
            align         : 'right',
            disablePadding: false,
            label         : '#',
            sort          : false
        }
    ],

    TABLE_HEADERS_STUDENT : [
        {
            id            : 'id',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã học sinh',
            sort          : true
        },
        {
            id            : 'userName',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã đăng nhập',
            sort          : true
        },
        {
            id            : 'name',
            align         : 'left',
            disablePadding: false,
            label         : 'Họ tên',
            sort          : true
        },
        {
            id            : 'birthday',
            align         : 'left',
            disablePadding: false,
            label         : 'Ngày sinh',
            sort          : true
        },
        {
            id            : 'gender',
            align         : 'right',
            disablePadding: false,
            label         : 'Giới tính',
            sort          : true
        },
        {
            id            : 'mobile',
            align         : 'right',
            disablePadding: false,
            label         : 'Điện thoại',
            sort          : true
        },
        {
            id            : 'active',
            align         : 'right',
            disablePadding: false,
            label         : '#',
            sort          : true
        }
    ],

    TABLE_HEADERS_SCHOOL : [
        {
            id            : 'logo',
            align         : 'left',
            disablePadding: false,
            label         : 'Logo',
            sort          : true
        },
        {
            id            : 'id',
            align         : 'left',
            disablePadding: true,
            label         : 'Mã trường',
            sort          : true
        },
        {
            id            : 'name',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên trường',
            sort          : true
        },
        {
            id            : 'degreeNumber',
            align         : 'left',
            disablePadding: false,
            label         : 'Cấp học',
            sort          : true
        },
        {
            id            : 'type',
            align         : 'left',
            disablePadding: false,
            label         : 'Loại trường',
            sort          : true
        },
        {
            id            : 'address',
            align         : 'right',
            disablePadding: false,
            label         : 'Thông tin liên hệ',
            sort          : true
        },
        {
            id            : 'background',
            align         : 'left',
            disablePadding: false,
            label         : 'Background',
            sort          : true
        },
        {
            id            : 'active',
            align         : 'right',
            disablePadding: false,
            label         : 'Active',
            sort          : true
        }
    ],

    TABLE_HEADERS_GROUPSUBJECT : [
        {
            id            : 'idGroup',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã tổ môn',
            sort          : true
        },
        {
            id            : 'nameGroup',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên tổ môn',
            sort          : true
        },
        {
            id            : 'leader',
            align         : 'left',
            disablePadding: false,
            label         : 'Tổ trưởng',
            sort          : true
        },
        {
            id            : '',
            align         : 'right',
            disablePadding: false,
            label         : '#',
            sort          : false
        }
    ],

    TABLE_HEADERS_SUBJECT : [
        {
            id            : 'nameSubject',
            align         : 'left',
            disablePadding: false,
            label         : 'Môn học',
            sort          : true
        },
        {
            id            : 'noOfLessonRequired',
            align         : 'left',
            disablePadding: false,
            label         : 'Số tiết học yêu cầu',
            sort          : true
        },
        {
            id            : 'semester',
            align         : 'left',
            disablePadding: false,
            label         : 'HK',
            sort          : true
        },
        {
            id            : '',
            align         : 'right',
            disablePadding: false,
            label         : '#',
            sort          : false
        }
    ],

    TABLE_HEADERS_QUESTIONPACK : [
        {
            id            : 'questionsPackId',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã gói câu hỏi',
            sort          : true
        },
        {
            id            : 'schoolYear',
            align         : 'left',
            disablePadding: false,
            label         : 'Niên khóa',
            sort          : true
        },
        {
            id            : 'classRoom',
            align         : 'left',
            disablePadding: false,
            label         : 'Khối lớp',
            sort          : true
        },
        {
            id            : 'subject',
            align         : 'right',
            disablePadding: false,
            label         : 'Môn học',
            sort          : true
        },
        {
            id            : 'section',
            align         : 'right',
            disablePadding: false,
            label         : 'Ban học',
            sort          : true
        },
        {
            id            : 'name',
            align         : 'right',
            disablePadding: false,
            label         : 'Tên gói câu hỏi',
            sort          : true
        },
        {
            id            : 'description',
            align         : 'right',
            disablePadding: false,
            label         : 'Diễn giải',
            sort          : true
        },
        {
            id            : 'active',
            align         : 'right',
            disablePadding: false,
            label         : 'Active',
            sort          : true
        }
    ],

    TABLE_HEADERS_TOPIC : [
        {
            id            : 'topicId',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã chuyên đề',
            sort          : true
        },
        {
            id            : 'subjectName',
            align         : 'left',
            disablePadding: false,
            label         : 'Môn học',
            sort          : true
        },
        {
            id            : 'degreeNumber',
            align         : 'left',
            disablePadding: false,
            label         : 'Khối học',
            sort          : true
        },
        {
            id            : 'topicName',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên chuyên đề',
            sort          : true
        },
        {
            id            : 'supperTopic',
            align         : 'right',
            disablePadding: false,
            label         : 'Chuyên đề cha',
            sort          : true
        },
        {
            id            : 'userCreate',
            align         : 'right',
            disablePadding: false,
            label         : 'Người tạo',
            sort          : true
        },
        {
            id            : 'dateCreate',
            align         : 'right',
            disablePadding: false,
            label         : 'Ngày tạo',
            sort          : true
        },
        {
            id            : '',
            align         : 'right',
            disablePadding: false,
            label         : '#',
            sort          : false
        }
    ],

    TABLE_HEADERS_QUESTION : [
        {
            id            : 'subject',
            align         : 'left',
            disablePadding: false,
            label         : 'Môn học',
            sort          : true
        },
        {
            id            : 'classRoom',
            align         : 'left',
            disablePadding: false,
            label         : 'Khối lớp',
            sort          : true
        },
        {
            id            : 'questionType',
            align         : 'right',
            disablePadding: false,
            label         : 'Dạng câu hỏi',
            sort          : true
        },
        {
            id            : 'topic',
            align         : 'right',
            disablePadding: false,
            label         : 'Chuyên đề',
            sort          : true
        },
        {
            id            : 'questionsPack',
            align         : 'right',
            disablePadding: false,
            label         : 'Gói câu hỏi',
            sort          : true
        },
        {
            id            : 'question',
            align         : 'right',
            disablePadding: false,
            label         : 'Câu hỏi',
            sort          : true
        },
        {
            id            : 'answerList',
            align         : 'right',
            disablePadding: false,
            label         : 'Các đáp án',
            sort          : true
        }
    ],

    TABLE_HEADERS_EXAM : [
        {
            id            : 'idExamDefine',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã kì thi',
            sort          : true
        },
        {
            id            : 'nameExam',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên kì thi',
            sort          : true
        },
        {
            id            : 'subjectName',
            align         : 'left',
            disablePadding: false,
            label         : 'Môn học',
            sort          : true
        },
        {
            id            : 'degreeNumber',
            align         : 'right',
            disablePadding: false,
            label         : 'Khối',
            sort          : true
        },
        {
            id            : 'nameClass',
            align         : 'right',
            disablePadding: false,
            label         : 'Lớp',
            sort          : true
        },
        {
            id            : 'typeTimeListing',
            align         : 'right',
            disablePadding: false,
            label         : 'Loại hình thời gian',
            sort          : true
        },
        {
            id            : 'isOnlineExamListing',
            align         : 'right',
            disablePadding: false,
            label         : 'Hình thức thi',
            sort          : true
        },
        {
            id            : 'isPrivateExamListing',
            align         : 'right',
            disablePadding: false,
            label         : 'Loại đề thi',
            sort          : true
        },
        {
            id            : 'levelListing',
            align         : 'right',
            disablePadding: false,
            label         : 'Mức độ khó',
            sort          : true
        },
        {
            id            : 'active',
            align         : 'right',
            disablePadding: false,
            label         : 'Active',
            sort          : true
        }
    ],

    TABLE_HEADERS_ROLE : [
        {
            id            : 'id',
            align         : 'left',
            disablePadding: true,
            label         : '',
            sort          : false
        },
        {
            id            : 'name',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên quyền người dùng',
            sort          : true
        },
        {
            id            : 'active',
            align         : 'right',
            disablePadding: false,
            label         : 'Active',
            sort          : true
        }
    ],

    TABLE_HEADERS_USER : [
        {
            id            : 'userId',
            align         : 'left',
            disablePadding: false,
            label         : 'Mã đăng nhập',
            sort          : true
        },
        {
            id            : 'name',
            align         : 'left',
            disablePadding: false,
            label         : 'Tên đầy đủ',
            sort          : true
        },
        {
            id            : 'phone',
            align         : 'left',
            disablePadding: false,
            label         : 'Số điện thoại',
            sort          : true
        },
        {
            id            : 'email',
            align         : 'right',
            disablePadding: false,
            label         : 'Email',
            sort          : true
        },
        {
            id            : 'typeUser',
            align         : 'right',
            disablePadding: false,
            label         : 'Loại người dùng',
            sort          : true
        },
        {
            id            : '',
            align         : 'right',
            disablePadding: false,
            label         : '#',
            sort          : false
        }
    ],

    TABLE_HEADERS_VOCABULARY : [
        {
            id            : 'name',
            align         : 'left',
            disablePadding: false,
            label         : 'Từ vựng',
            sort          : true
        },
        {
            id            : 'topic',
            align         : 'left',
            disablePadding: false,
            label         : 'Chuyên đề',
            sort          : true
        },
        {
            id            : 'typeWord',
            align         : 'left',
            disablePadding: false,
            label         : 'Loại từ',
            sort          : true
        },
        {
            id            : 'pronunciationUK',
            align         : 'left',
            disablePadding: false,
            label         : 'phiên âm UK',
            sort          : true
        },
        {
            id            : 'pronunciationUS',
            align         : 'left',
            disablePadding: false,
            label         : 'phiên âm US',
            sort          : true
        },
        {
            id            : '',
            align         : 'right',
            disablePadding: false,
            label         : '#',
            sort          : false
        }
    ],

    RIGHT_ID_CLASS : "manageClass",
    RIGHT_ID_TEACHER : "manageTeacher",
    RIGHT_ID_STUDENT : "manageStudent",
    RIGHT_ID_GROUPSUBJECT: "manageGroupSubject",
    RIGHT_ID_SUBJECT: "manageSubject",
    RIGHT_ID_QUESTIONPACK: "manageQuestionPack",
    RIGHT_ID_TOPIC: "manageTopic",
    RIGHT_ID_QUESTION: "manageQuestion",
    RIGHT_ID_EXAMINATION: "manageExamination",
    RIGHT_ID_ROLE: "manageRole",
    RIGHT_ID_ROLEUSER: "manageRoleUser",

    // TODO
    RIGHT_ID_COMMON: "manageCommon",
    RIGHT_ID_ROLEAPPROVE: "manageRoleApprove",
    RIGHT_ID_ROLEPHUCKHAO: "manageRolePhucKhao",
    RIGHT_ID_APPROVECHANGEPOINT: "manageApproveChangePoint",
    RIGHT_ID_APPROVEEXAM: "manageApproveExam",
    RIGHT_ID_APPROVEQUESTION: "manageApproveQuestion",
    RIGHT_ID_CHECKEXAMINATION: "manageCheckExamination",
    RIGHT_ID_POINT: "managePoint",

    RIGHT_ACT_VIEW : "view",
    RIGHT_ACT_UPDATE : "update",
    RIGHT_ACT_CREATE : "create",
    RIGHT_ACT_DELETE : "delete",
    helpers: {
        getDisplay : function(rights, rightId, act) {
            if (rights && rights.length > 0 &&  rights.find(r => r.id === rightId)[act]) {
                return "inline"
            }
            return "none"
        }
    },
    SEMESTER_DATA: [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "1",
            label: "1"
        },
        {
            value: "2",
            label: "2"
        }
    ],
    TYPE_WORD_EN: [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "Noun",
            label: "Danh từ"
        },
        {
            value: "Verb",
            label: "Động từ"
        },
        {
            value: "Mverb",
            label: "Động từ khiếm khuyết"
        },
        {
            value: "Articles",
            label: "Mạo từ"
        },
        {
            value: "Pronouns",
            label: "Đại từ"
        },
        {
            value: "Adjective",
            label: "Tính từ"
        },
        {
            value: "Adverb",
            label: "Trạng từ"
        },
        {
            value: "Preposition",
            label: "Giới từ"
        }
    ]


    /*Noun (Danh từ),
     Verb (Động từ),
     Modal Verb (Động từ khiếm khuyết),
      Articles (Mạo từ),
       Pronouns (Đại từ),
        Adjective (Tính từ),
         Adverb (Trạng từ),
          Preposition  (Giới từ)*/

};
