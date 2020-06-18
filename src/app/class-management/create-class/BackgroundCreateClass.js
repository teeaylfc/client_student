import React, { Component } from 'react'
import { Button } from '@material-ui/core'

export default class BackgroundCreateClass extends Component {
    render() {
        return (
            <div className="image-background flex flex-col justify-center items-center" style={{ backgroundImage: "url(assets/images/backgrounds/background.png)" }}>
                <h1 className="font-bold text-white mb-16">Tạo mới lớp học</h1>
                <img style={{ objectFit: "contain", width: "35%" }} src="assets/images/backgrounds/boy.png" />

                <Button
                    onClick={this._navigate}
                    variant="contained"
                    className="p-12 px-24 mt-24 items-center justify-center bg-white color_blue">
                    <h2 className="text_button_base">Tạo lớp học ngay</h2>
                </Button>
            </div>
        )
    }
    _navigate = () => {
        console.log("1212")
        this.props.history.push('/createClass')
    }
}
