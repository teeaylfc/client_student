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
        id            : 'subjectName',
        align         : 'left',
        disablePadding: false,
        label         : 'Tên môn học',
        sort          : true
    },
    {
        id            : 'pointQuiz',
        align         : 'left',
        disablePadding: false,
        label         : 'Miệng',
        sort          : true
    },
    {
        id            : 'point15MinutesOnline',
        align         : 'left',
        disablePadding: false,
        label         : '15 phút trực tuyến',
        sort          : true
    },
    {
        id            : 'point45MinutesOnline',
        align         : 'left',
        disablePadding: false,
        label         : '1 tiết trực tuyến',
        sort          : true
    },
    {
        id            : 'pointSemesterOnline',
        align         : 'right',
        disablePadding: false,
        label         : 'Học kỳ trực tuyến',
        sort          : true
    },
    {
        id            : 'point15Minutes',
        align         : 'left',
        disablePadding: false,
        label         : '15 phút',
        sort          : true
    },
    {
        id            : 'point45Minutes',
        align         : 'left',
        disablePadding: false,
        label         : '1 tiết',
        sort          : true
    },
    {
        id            : 'pointSemester',
        align         : 'right',
        disablePadding: false,
        label         : 'Học kỳ',
        sort          : true
    },
    {
        id            : 'pointGPA',
        align         : 'right',
        disablePadding: false,
        label         : 'TBHK',
        sort          : true
    },
    {
        id            : 'note',
        align         : 'right',
        disablePadding: false,
        label         : 'Ghi chú',
        sort          : true
    }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class StudentPointTableHead extends React.Component {
    state = {
        selectedStudentsMenu: null,
        filter: []
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedStudentsMenu = (event) => {
        this.setState({selectedStudentsMenu: event.currentTarget});
    };

    closeSelectedStudentsMenu = () => {
        this.setState({selectedStudentsMenu: null});
    };

    render()
    {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow className="h-54">
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.align}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
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
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(StudentPointTableHead);
