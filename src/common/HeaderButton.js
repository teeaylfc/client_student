import React, { PureComponent } from 'react'
import { Button } from '@material-ui/core'
import UploadFileModal from '../app/utils/UploadFileModal'
import { FuseAnimate } from '@fuse';

export default class HeaderButton extends PureComponent {
    state = {
        showModal: false,
        showResultModal: false,
        fileUpload: null,
    }
    render() {
        const { addbutton, importbutton, exportbutton, menubutton } = this.props
        return (
            <FuseAnimate animation="transition.expandIn" delay={300}>
                <div className="flex flex-row">
                
                    {addbutton && <Button onClick={addbutton} className="btn_add">
                        <img src="assets/images/icons/ic_add.png" className="icon_add" />
                    </Button>
                    }

                    {
                        exportbutton &&
                        <Button onClick={this.handleShow} className="btn_import_export">
                            <img src="assets/images/icons/ic_export.png" className="icon_import_export" />
                        </Button>
                    }
                    {
                        importbutton &&
                        <Button onClick={this.handleShow} className="btn_import_export">
                            <img src="assets/images/icons/ic_import.png" className="icon_import_export" />
                        </Button>
                    }

                    {
                        menubutton &&
                        <Button className="btn_menu">
                            <img src="assets/images/icons/ic_menu.png" className="icon_add" />
                        </Button>
                    }

                    <UploadFileModal
                        showModal={this.state.showModal}
                        handleClose={this.handleClose}
                        onChangeHandler={this.onchangeUploadFile}
                        handleUploadFile={this.handleUploadFile} />

                </div>
            </FuseAnimate>

        )
    }

    onchangeUploadFile = (event) => {
        console.log(event.target.files[0])
        this.setState({
            fileUpload: event.target.files[0],
            loaded: 0
        })
    }
    handleUploadFile = async () => {
        const file = this.state.fileUpload;
        console.log(file)
        if (file) {
            // await this.props.uploadClass(file, this.props.user.schools[0].id);
            await this.handleClose();
            await this.setState({ showResultModal: true })
        } else {
            alert("Bạn chưa chọn File")
        }
    }
    handleClose = () => {
        this.setState({ showModal: false });
    }

    
    handleShow = () => {
        this.setState({ showModal: true });
    }
}
