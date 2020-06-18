import React, { Component } from 'react'
import { Button, Icon } from '@material-ui/core'
import { FuseAnimate } from '@fuse';
export default class CreateExamDone extends Component {
    render() {
        return (
            <div className="mockExam-background  items-center justify-center flex flex-col" style={{ backgroundImage: "url(assets/images/backgrounds/background_exam.png)" }}>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <h3 className="text-white text-4xl font-bold mb-32">
                        Hoàn thành đề thi
                    </h3>
                </FuseAnimate>
                {/* <FuseAnimate animation="transition.expandIn" delay={300}> */}
                    <img style={{ width: "28%", objectFit: "contain" }} src="assets/images/backgrounds/bg_doneExam.png" />
                {/* </FuseAnimate> */}
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Button
                        // onClick={this._createExam}
                        className="items-center bg-white mt-32 py-8 px-12">
                        <p className="text_button_base color_blue mr-32">Xem danh sách đề thi</p>
                        <Icon className="color_blue">
                            keyboard_arrow_right
                        </Icon>
                    </Button>
                </FuseAnimate>
            </div>
        )
    }
}
