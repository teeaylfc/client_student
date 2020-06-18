import React, {Component} from 'react';
import './../../../styles/home.css';
import {withRouter, Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';
const BarCircle = (props) =>
    <div className="flex flex-row justify-start">
        <div
            style={{
            backgroundColor: props.color,
            width: "20px",
            height: "20px",
            marginRight: "15px",
            }}
            className="rounded-full " />
        <Typography className="text_quicksand">
            {props.value}
        </Typography>
    </div>

const dataCirle = [
{ name: 'Khối 10', value: 300 },
{ name: 'Khối 11', value: 100 },
{ name: 'Khối 12', value: 50 },
];
const COLORS = ['#5D78FF', '#FD3A97', '#34BFA3'];

const data = [
    {
      name: 'Jan', nv: 40, uv: 24
    },
    {
      name: 'Feb', nv: 30, uv: 13
    },
    {
      name: 'Mar', nv: 20, uv: 98
    },
    {
      name: 'Apr', nv: 27, uv: 39
    },
    {
      name: 'May', nv: 18, uv: 48
    },
    {
      name: 'Jun', nv: 23, uv: 38
    },
    {
      name: 'Jul', nv: 34, uv: 43
    },
    {
      name: 'Aug', nv: 34, uv: 37
    },
    {
      name: 'Sep', nv: 34, uv: 13
    },
    {
      name: 'Oct', nv: 34, uv: 23
    },
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        var widthMenuBar = 280
        var paddingContainer = 70
        this.setState({ width: window.innerWidth - widthMenuBar - paddingContainer, height: window.innerHeight });
    }
    
    
    render() {
        const { width, height } = this.state
        return (
            <div className="flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0">
                <div className="home-page w-full">
                    <div className="header-content flex flex-row w-full">
                        <h2 className="title">Dashboard</h2>
                        <div className="header-content-right flex flex-row">
                            <Link to="/home">Trang chủ</Link>
                            <span className="arrow">></span>
                            <Link to="/home">Dashboard</Link>
                        </div>
                    </div>

                    <div className="content-page">
                        {/* List information */}
                        <div className="infor-list row">
                            <div className="col-12 col-sm-4">
                                <div className="infor-item flex flex-row infor-item-student">
                                    <div className="infor-item-left">
                                        <h4 className="title">Tổng số học sinh trong trường</h4>
                                        <p className="number">1000</p>
                                        <p className="position">Học sinh</p>
                                    </div>
                                    <div className="infor-item-right">
                                        <img src="assets/images/icons/folder-5.svg"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="infor-item flex flex-row infor-item-teacher">
                                    <div className="infor-item-left">
                                        <h4 className="title">Tổng số giáo viên trong trường</h4>
                                        <p className="number">300</p>
                                        <p className="position">Giáo viên</p>
                                    </div>
                                    <div className="infor-item-right">
                                        <img src="assets/images/icons/book-2.png"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="infor-item flex flex-row infor-item-class">
                                    <div className="infor-item-left">
                                        <h4 className="title">Tổng số lớp học trong trường</h4>
                                        <p className="number">100</p>
                                        <p className="position">Lớp học</p>
                                    </div>
                                    <div className="infor-item-right">
                                        <img src="assets/images/icons/medal-1.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Notification */}
                        <div className="notification">
                            <h6 className="notification-title">Thông báo</h6>
                            <div className="notification-list">
                                <div className="notification-item flex flex-row items-center">
                                    <div className="images">
                                        <img src="assets/images/home/Avatar.png"/>
                                    </div>
                                    <div className="info">
                                        <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="time">4 giờ trước</p>
                                    </div>
                                </div>
                                <div className="notification-item flex flex-row items-center">
                                    <div className="images">
                                        <img src="assets/images/home/Avatar.png"/>
                                    </div>
                                    <div className="info">
                                        <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="time">4 giờ trước</p>
                                    </div>
                                </div>
                                <div className="notification-item flex flex-row items-center">
                                    <div className="images">
                                        <img src="assets/images/home/Avatar.png"/>
                                    </div>
                                    <div className="info">
                                        <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="time">4 giờ trước</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Chart */}
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="home-chart home-chart-left">
                                    <h6 className="notification-title">Số lượng đề thi mẫu được tạo cho từng môn học của từng khối</h6>
                                    <div className="flex flex-row w-full justify-start align-items-center">
                                        <PieChart width={(width * 1 / 3) - 40} height={320} onMouseEnter={this.onPieEnter}>
                                            <Pie
                                                data={dataCirle}
                                                innerRadius={85}
                                                outerRadius={100}
                                                fill="#6090FF"
                                                paddingAngle={1}
                                                dataKey="value"
                                            >
                                                {
                                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                                }
                                            </Pie>
                                        </PieChart>
                                        <div className="list-color flex flex-col">
                                            <BarCircle color={COLORS[0]} value="Khối 10" />
                                            <BarCircle color={COLORS[1]} value="Khối 11" />
                                            <BarCircle color={COLORS[2]} value="Khối 12" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="home-chart home-chart-right">
                                    <h6 className="notification-title">Tỷ lệ học sinh đạt điểm cho từng môn học cho từng khối</h6>
                                    <div className="home-chart-content">
                                        <BarChart
                                            width={(width * 1 / 2) - 50}
                                            barSize={10}
                                            height={343}
                                            data={data}
                                            margin={{
                                                top: 5, right: 10, left: 0, bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip content="sdfsdfsd"/>
                                            <Legend />
                                            <Bar dataKey="nv" fill="#6090FF" />
                                            <Bar dataKey="uv" fill="#34BFA3" />
                                        </BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Home);
