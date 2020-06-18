import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Tooltip,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id: 'index',
        align: 'center',
        disablePadding: false,
        label: 'STT',
        sort: true,
        style: {
            maxWidth: '10px'
        }
    },
    {
        id: 'nameExam',
        align: 'left',
        disablePadding: false,
        label: 'Tên kì thi',
        sort: true
    },
    {
        id: 'subjectName',
        align: 'center',
        disablePadding: false,
        label: 'Môn học',
        sort: true,
        style: {
            minWidth: '155px'
        }
    },
    {
        id: 'degreeNumber',
        align: 'center',
        disablePadding: false,
        label: 'Khối',
        sort: true
    },
    {
        id: 'nameClass',
        align: 'center',
        disablePadding: false,
        label: 'Lớp',
        sort: true
    },
    {
        id: 'startTime',
        align: 'center',
        disablePadding: false,
        label: 'Thời gian bắt đầu',
        sort: true,
        style: {
            minWidth: '210px'
        }
    },
    {
        id: 'expiredTime',
        align: 'center',
        disablePadding: false,
        label: 'Thời gian kết thúc',
        sort: true,
        style: {
            minWidth: '210px'
        }
    },
    {
        id: 'questionPack',
        align: 'center',
        disablePadding: false,
        label: 'Gói câu hỏi',
        sort: true
    },
    {
        id: 'status',
        align: 'center`',
        disablePadding: false,
        label: 'Trạng thái',
        sort: true
    }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class TestPlanListTableHead extends React.Component {

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };


    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow className="h-54">
                    {rows.map((row, i) => {
                        return (
                            <TableCell
                                key={i}
                                align={'center'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                scope='col'
                                style={row.style ? row.style : {}} >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                            style={{ textAlign: 'center' }}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>

                        );
                    }, this)}
                    <TableCell
                        key={rows.length}
                        align='center'
                        padding='default'>
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, { withTheme: true })(TestPlanListTableHead);
