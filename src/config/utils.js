const constants = {
    ImageUrl: "http://171.244.0.59:4000/api/images/",
    Gender: {
        MALE: 'M',
        FEMALE: 'F'
    },
    QuestionType: {
        QUESTION_TYPE_SINGLE_CHOICE: "SINGLE_CHOICE",
        QUESTION_TYPE_MULTI_CHOICE: "MULTI_CHOICE",
        QUESTION_TYPE_MATCHING: "MATCHING",
        QUESTION_TYPE_MATCHING_IMAGE: "MATCHING_IMAGE",
    },
    questionLevel:{
        EASY: "Dễ",
        NORMAL: "Trung bình",
        HARD: "Khó",
    },
    userType: {
        TEACHER: "GV",
        STUDENT: "HS"
    },
    schoolType: {
        TYPE_PRIMARY_SCHOOL: "PRIMARY_SCHOOL",
        TYPE_SECONDARY_SCHOOL: "SECONDARY_SCHOOL",
        TYPE_HIGH_SCHOOL: "HIGH_SCHOOL",
        TYPE_OTHER: "OTHER"
    },
    typeTime:{
        SEMESTER: "SEMESTER",
        OTHER:"OTHER"
    }

}
export default constants;