import constants from "../../config/utils";

const getListGrade = (school) => {
    // var item = this.props.school
    var newlistGrade = []
    if (school && school.schoolType) {
        switch (school.schoolType) {
            case constants.schoolType.TYPE_PRIMARY_SCHOOL:
                newlistGrade = [1, 2, 3, 4, 5]
                break;
            case constants.schoolType.TYPE_SECONDARY_SCHOOL:
                newlistGrade = [6, 7, 8, 9]
                break;

            case constants.schoolType.TYPE_HIGH_SCHOOL:
                newlistGrade = [10, 11, 12]
                break;
            default:
                newlistGrade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                break;
        }
        return newlistGrade
    }
    else {
        newlistGrade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        return newlistGrade
    }
}
export default getListGrade