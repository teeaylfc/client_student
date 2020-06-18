import constants from "../config/utils"

export default function getImage(source){
    var url = constants.ImageUrl + source
    return url
}