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
    { name: 'Khó', value: 300 },
    { name: 'Dễ', value: 100 },
    { name: 'Trung bình', value: 50 },
];
const COLORS = ['#5D78FF', '#FD3A97', '#34BFA3'];
const dataCirle2 = [
    { name: 'Riêng tư', value: 300 },
    { name: 'Công khai', value: 100 },
];
const COLORS2 = ['#5D78FF', '#FD3A97'];

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

class HomeTeacher extends Component {
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
        const { width, height } = this.state;
        const textspecial = 'Top 10 đề thi có tỷ lệ làm đúng < 30% trong niên khóa'
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
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="infor-item flex flex-row infor-item-student">
                                    <div className="infor-item-left">
                                        <h4 className="title">Số đề đã được tạo</h4>
                                        <p className="number">24</p>
                                        <p className="position">Đề thi</p>
                                    </div>
                                    <div className="infor-item-right">
                                        <img src="assets/images/icons/folder-5.svg"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="infor-item flex flex-row infor-item-teacher">
                                    <div className="infor-item-left">
                                        <h4 className="title">Số đề đang tạo</h4>
                                        <p className="number">10</p>
                                        <p className="position">Đề thi</p>
                                    </div>
                                    <div className="infor-item-right">
                                        <img src="assets/images/icons/folder-5.svg"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="infor-item flex flex-row infor-item-class">
                                    <div className="infor-item-left">
                                        <h4 className="title">Số đề kết thúc</h4>
                                        <p className="number">15</p>
                                        <p className="position">Đề thi</p>
                                    </div>
                                    <div className="infor-item-right">
                                        <img src="assets/images/icons/folder-5.svg"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="infor-item flex flex-row infor-item-yellow">
                                    <div className="infor-item-left">
                                        <h4 className="title">Số đề đang có hiệu lực</h4>
                                        <p className="number">30</p>
                                        <p className="position">Đề thi</p>
                                    </div>
                                    <div className="infor-item-right">
                                        <img src="assets/images/icons/folder-5.svg"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-5">
                                <div className="infor-item flex flex-row infor-item-green">
                                    <div className="infor-item-left">
                                        <h4 className="title">Tổng số học sinh tham gia làm đề do bạn tạo</h4>
                                        <p className="number">50</p>
                                        <p className="position">Học sinh</p>
                                    </div>
                                    <div className="infor-item-right">
                                        <img src="assets/images/icons/link-1.svg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Notification */}
                        {/* List Chart */}
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="home-chart home-chart-right">
                                    <h6 className="notification-title">Top 10 đề có tỷ lệ được làm nhiều nhất trong niên khóa</h6>
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
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="home-chart home-chart-right">
                                    <h6 className="notification-title">Top 10 đề có tỷ lệ hoàn thành > 70% trong niên khóa</h6>
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
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="home-chart home-chart-right">
                                    <h6 className="notification-title">Top 10 đề có tỷ lệ làm đúng > 70% trong niên khóa</h6>
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
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="home-chart home-chart-right">
                                    <h6 className="notification-title">{textspecial}</h6>
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
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="home-chart home-chart-left">
                                    <h6 className="notification-title">Số câu hỏi được tạo (theo cấp độ)</h6>
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
                                            <BarCircle color={COLORS[0]} value="Khó" />
                                            <BarCircle color={COLORS[1]} value="Dễ" />
                                            <BarCircle color={COLORS[2]} value="Trung bình" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="home-chart home-chart-left">
                                    <h6 className="notification-title">Số đề đã được tạo (theo loại đề thi)</h6>
                                    <div className="flex flex-row w-full justify-start align-items-center">
                                        <PieChart width={(width * 1 / 3) - 40} height={320} onMouseEnter={this.onPieEnter}>
                                            <Pie
                                                data={dataCirle2}
                                                innerRadius={85}
                                                outerRadius={100}
                                                fill="#6090FF"
                                                paddingAngle={1}
                                                dataKey="value"
                                            >
                                                {
                                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />)
                                                }
                                            </Pie>
                                        </PieChart>
                                        <div className="list-color flex flex-col">
                                            <BarCircle color={COLORS2[0]} value="Riêng tư" />
                                            <BarCircle color={COLORS2[1]} value="Công khai" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-chart home-chart-right">
                            <h6 className="notification-title">Điểm trung bình cho mỗi loại đề thi</h6>
                            <div className="home-chart-content">
                                <BarChart
                                    width={(width) - 50}
                                    barSize={10}
                                    height={700}
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
        )
    }
}

export default withRouter(HomeTeacher);
