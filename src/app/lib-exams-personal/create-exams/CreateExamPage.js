import React, { Component } from 'react';
import { Card, CardContent, Button, Typography, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
class CreateExam extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
    }
  
    render() {
        return (
            <div className="mockExam-background flex flex-col" style={{ backgroundImage: "url(assets/images/backgrounds/background.png)" }}>
                <div className="header-content-right flex flex-row justify-end">
                    <Link to="/home">
                        <p className="text-white">
                            Trang chủ
                        </p>
                    </Link>
                    <span className="arrow text-white">></span>
                    <Link className="text-white" to="/home">
                        <p className="text-white">
                            Dashboard
                        </p>
                    </Link>

                </div>
                <div style={{ flex: 1.8 }} className="flex w-full items-center justify-center flex-col">
                    <h3 className="text-white text-4xl font-bold mb-32">
                        Tạo đề thi
                        </h3>
                    <Button
                        onClick={this._createExam}
                        className="rounded-full">
                        <img style={{ width: "120px", objectFit: "contain" }} src="assets/images/buttons/btn_create.png" />
                    </Button>


                </div>
                <div className="flex flex-1">

                </div>
            </div>
        );
    }
    _createExam = () => {
        this.props.history.push("/createExamStep")
    }
}




export default CreateExam

