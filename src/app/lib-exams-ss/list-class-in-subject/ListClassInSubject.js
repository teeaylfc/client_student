import React, { Component } from 'react'
import { Button, Icon, InputBase, Checkbox, Link, Fab } from '@material-ui/core'
import HeaderButton from '../../../common/HeaderButton'
import InputDropDown from '../../../common/InputDropDown'
import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
import dataService from '../../services/dataService';
import { connect } from 'react-redux'
import { formatDate } from '../../utils/datetime';
var moment = require('moment');

const ItemClass = (props) =>
    <Button onClick={props.onPress} style={{ boxShadow: "unset", textTransform: "unset" }}>
        <div className="flex w-full relative items-center justify-center">
            <img style={{ height: "80px", objectFit: "contain" }}
                src={`assets/images/logos/class-${(props.index < 5) ? "1" : (props.index > 4 && props.index < 9) ? "2" : "3" }.png`} />
            <h3 className="font-bold text-white absolute">{props.item}</h3>
        </div>

    </Button>

class ListClassInSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
            ],
            loading: true,
        }
    }
    _navigateDetail = (obj) => () => {
        const { item } = this.props.location.state 
        this.props.history.push({
            pathname: '/ListExams',
            state: { item: obj, subject: item},
        })
    }
    getImageSubject = (item) => {
        switch (item.subjectId) {
            case "maths":

                break;

            default:
                break;
        }
    }



    render() {
        const { loading, data, } = this.state
        const { item } = this.props.location.state
        console.log("item")
        console.log(item)
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <div className="flex w-full items-center justify-center object-contain" style={{ height: "120px", backgroundImage: "url(assets/images/logos/header-subject.png)" }}>
                        <h1 className="font-bold text-white">{item.subjectName}</h1>
                    </div>

                </div>
                <div className="exam_grid mt-24">
                    {data.length > 0 && data.map((item, i) => <ItemClass item={item} index={i} key={i} onPress={this._navigateDetail(item)} />)}
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    console.log("---------------------")
    console.log(state)
    return {
        user: state.auth.login.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListClassInSubject)