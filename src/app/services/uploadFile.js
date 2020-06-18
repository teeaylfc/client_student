import axios from 'axios';
let instance;
instance = axios.create({
    baseURL: "http://171.244.0.59:4000/",
    // timeout: constants.SERVER_TIMEOUT,
    headers: {
        'content-type': 'multipart/form-data'
    }
});


export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append(
        "uploadFile",
        file
    );
    let response = await instance.post('/api/common/uploadImage', formData)
    return response.data;
}
