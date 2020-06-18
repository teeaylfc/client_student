// update school
import axios from "axios";
import {GET_ERRORS} from "../app/utils/types";
import {showMessage} from 'app/store/actions/fuse';
import Constants from "./Constants"
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const uploadImage = (uploadFile) => dispatch => {
    let data = new FormData();
    data.append('uploadFile', uploadFile);
    //data.append('idSchool', idSchool)
    axios
        .post('/api/common/uploadImage', data)
        .then((res) => {
                dispatch({
                    type: UPLOAD_IMAGE,
                    payload: Constants.BASE_IMAGE_URL + res.data.result
                });
            }
        )
        .catch(err => {
            dispatch(showMessage({message: 'Upload ảnh bị lỗi!'}));
            dispatch({
                type: GET_ERRORS,
                payload: err,
            })
        });
};