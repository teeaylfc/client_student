import React from 'react';
import {bindActionCreators} from "redux";
import * as Actions from './common.action';
import connect from "react-redux/es/connect/connect";
import reducer from "./index";
import {withRouter} from 'react-router-dom';
import withReducer from 'app/store/withReducer';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate props', this.props);
        console.log('componentDidUpdate state', this.state);
        /*if ((this.props.fileName && !this.state.imagePreviewUrl) ||
            (this.props.fileName && this.state.imagePreviewUrl && this.props.fileName !== this.state.imagePreviewUrl)) {
                this.setState({imagePreviewUrl : this.props.fileName, file : this.props.fileName.substring(this.props.fileName.lastIndexOf("/"))});
                this.props.uploadImage(this.props.fileName);
        }*/
    }

    chooseFile = (e) => {
        let file = e.target.files[0];
        this.setState({file : file});
    }

    uploadBtnClick = async () => {
        await this._handleImageChange(this.state.file);
        await this.props.uploadAction(this.state.file);
        await this.props.uploadImage(this.props.fileName, this.props.name);
    }

    removedBtnClick = async () => {
        await this._handleImageChange(null);
        await this.props.uploadImage('', this.props.name)
    }

    _handleImageChange = (file) => {
        if(file) {
            this.setState({file : file})
        } else {
            this.setState({file : '', imagePreviewUrl: ''})
        }
    }


    render() {
        const {file} = this.props;
        let $imagePreview = null;
        if (file) {
            $imagePreview = (<img src={file} />);
        }

        return (
            <div className="previewComponent ml-5">
                <div className="row">
                    <div className="col-9 border-1">
                        <input className="fileInput" id="imageInput"
                               type="file"
                               //value={file !== "" ? file : "" }
                               onChange={(e)=>this.chooseFile(e)}
                        />
                    </div>
                    <div className="col-3 d-flex justify-center">
                        <button className="btn btn-primary mr-2" onClick= {this.uploadBtnClick}>Upload</button>
                        <button className="btn btn-danger" onClick= {this.removedBtnClick}>Remove</button>
                    </div>
                    <div className="col-12 d-flex justify-center mt-4">
                        {file ? <div className="imgPreview">
                                {$imagePreview}</div> : ''}
                    </div>
                </div>
            </div>

        )
    }

}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        uploadAction: Actions.uploadImage
    }, dispatch);
}

function mapStateToProps({imageReducer, fuse})
{
    console.log('reducer data ', imageReducer);
    console.log('reducer data fileName ', imageReducer.commonReducer.fileName);
    console.log('reducer data fuse ' , fuse);
    return {
        //searchText: studentsApp.student.searchText,
        mainTheme : fuse.settings.mainTheme,
        fileName : imageReducer.commonReducer.fileName
    }
}
export default withReducer('imageReducer', reducer) (withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageUpload)));
