import React, { useEffect, Component } from 'react';
import { Typography, Card } from '@material-ui/core';
import { FusePageSimple } from '@fuse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
// import { parseJSON } from 'date-fns'
import { vi } from 'date-fns/locale'
import { formatDistanceToNow, parseISO } from 'date-fns'
import dataService from '../../services/dataService';

const ItemNoti = (props) => {
    var item = props.item
    var time = ""
    // if (item.createDate) {
    //     time = formatDistanceToNow(parseISO(item.createDate), { includeSeconds: true, locale: vi })
    // }
    return (
        <div className="flex flex-col">
            <ListItem className="pl-24 pr-24" button>
                {/* <img alt="noti" className="w-64 h-64 rounded-full" src="assets/images/logos/noti.jpg" /> */}
                {/* <div className="ml-12 flex flex-col justify-center">
                    <Typography className="mb-8"><span>{item.title}</span>: {item.body}</Typography>
                    <Typography className="text-xs">{time}</Typography>
                </div> */}
            </ListItem>
            <Divider light />
        </div>
    )
}



class ListNotiPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [

            ]
        };
    }

    componentDidMount() {
        dataService.getListNotiTeacher()
            .then(res => {
                console.log("-----------")
                console.log(res)
                this.setState({
                    list: res
                })
            })
            .catch(err => {
                console.log("errrr")
                console.log(err)
            })
    }


    render() {
        const { list } = this.state
        return (

            <div className="div_container">
                <h3 className="header_text ">
                    Thông báo
                        </h3>
                {
                    list.length > 0 ?
                        <div className="bg-white w-full rounded mt-20">
                            <List component="nav" aria-label="main mailbox folders">
                                {
                                    list.map((item, i) => <h3>231232131</h3>)
                                }
                            </List>

                        </div>
                        :
                        <div className="flex-1 flex items-center justify-center w-full h-50 mt-20">
                            <h4>Không có thông báo nào</h4>
                        </div>
                }

            </div>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        // notifications: state.noti.notifiations.list
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(mapStateToProps, null)(ListNotiPage);