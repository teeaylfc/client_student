import React, { Component } from 'react'
import { Button, Icon, InputBase, Checkbox, Link, Fab } from '@material-ui/core'
import HeaderButton from '../../common/HeaderButton'
import InputDropDown from '../../common/InputDropDown'
import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
import dataService from '../services/dataService';
import { connect } from 'react-redux'
import { formatDate } from '../utils/datetime';
import getImage from '../../common/getImageNetwork';
var moment = require('moment');

const ItemSubject = (props) =>
    <Button 
    onClick={props.onPress}
    style={{ boxShadow: "unset", textTransform:"unset"}} 
    className="flex flex-1 py-24 bg-white items-center justify-center border">
        <div className="flex flex-col w-full">
            <img style={{ height: "80px", objectFit:"contain" }} className="object-contain mb-24" src={getImage(props.item.image)} />
            <h3 className="font-bold">{props.item.subjectName}</h3>
        </div>

    </Button>

class ListSubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [

            ],
            loading: true,
        }
    }
    _navigateDetail = (obj) => () => {
        this.props.history.push({
            pathname: '/listClassInSubject',
            state: { item: obj },
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

    componentDidMount() {
        dataService.getListAllSubjects()
            .then(res => {
                console.log(res)
                this.setState({
                    data: res.data
                })
            })
    }

    render() {
        const { loading, data, } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Danh sách các môn học
                </h2>
                    </FuseAnimate>

                </div>
                <div className="exam_grid">
                    {
                        data.length > 0 && data.map((item, i) => <ItemSubject onPress={this._navigateDetail(item)} item={item} key={i} index={i} />)
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSubjects)