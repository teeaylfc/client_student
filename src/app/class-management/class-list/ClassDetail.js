import React, { Component } from 'react'
import HeaderButton from '../../../common/HeaderButton'
import { FuseAnimate } from '@fuse';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import ClassInfo from './ClassInfo';
import StudentsList from './StudentsList';
import ClassDiary from './ClassDiary';
import dataService from '../../services/dataService';


export default class ClassDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            info: null,
        }
    }
    componentDidMount() {
        this.getInfoClass()
    }
    getInfoClass() {
        var _id = this.props.location.state._id
        dataService.getDetailClass(_id)
            .then(res => {
                this.setState({
                    info: res
                })
            })
    }

    render() {
        const { tab, info } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            {info && info.className ? info.className : ""}
                        </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton={() => { }} exportbutton menubutton />
                </div>
                <Tabs indicatorColor="transparent" value={tab} onChange={this.handleChangeTab} aria-label="simple tabs example">
                    <Tab
                        label="Thông tin"
                        {...this.propsTab(0)}
                    />
                    <Tab
                        label="Danh sách học sinh lớp"
                        {...this.propsTab(1)}
                        
                    />
                    <Tab
                        label="Nhật ký lớp học"
                        {...this.propsTab(2)}
                    />
                </Tabs>
                <Divider style={{ height: "1.5px" }} className="backgroundColor_blue" />
                {
                    this.renderTab()
                }
            </div >
        )
    }
    editInfo = (item) => {
        this.setState({
            info: item
        })
    }
    renderTab() {
        console.log("this.state.info")
        console.log(this.state.info)
        switch (this.state.tab) {
            case 0:
                return this.state.info ? <ClassInfo editInfo={this.editInfo} item={this.state.info} /> : null
            case 1:
                return <StudentsList {...this.props} />
            case 2:
                return <ClassDiary  {...this.props}/>
            default:
                return null;
        }
    }

    propsTab = (index) => {
        const { tab } = this.state
        return {
            className: tab == index ? "rounded-t gradient_blue text_button_base text-white" : "text_button_base",
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleChangeTab = (event, newValue) => {
        this.setState({
            tab: newValue
        })
    }

}
