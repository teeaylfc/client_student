import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import classNames from 'classnames';

const rows = [
    {
        id            : 'index',
        align         : 'left',
        disablePadding: false,
        label         : 'STT',
        sort          : true
    },
    {
        id            : 'idExamDefine',
        align         : 'left',
        disablePadding: false,
        label         : 'Mã kì thi',
        sort          : true
    },
    {
        id            : 'nameExam',
        align         : 'left',
        disablePadding: false,
        label         : 'Tên kì thi',
        sort          : true
    },
    {
        id            : 'subjectName',
        align         : 'left',
        disablePadding: false,
        label         : 'Môn học',
        sort          : true
    },
    {
        id            : 'degreeNumber',
        align         : 'right',
        disablePadding: false,
        label         : 'Khối',
        sort          : true
    },
    {
        id            : 'nameClass',
        align         : 'right',
        disablePadding: false,
        label         : 'Lớp',
        sort          : true
    },
    {
        id            : 'startTime',
        align         : 'right',
        disablePadding: false,
        label         : 'Thời gian bắt đầu',
        sort          : true
    },
    {
        id            : 'expiredTime',
        align         : 'right',
        disablePadding: false,
        label         : 'Thời gian kết thúc',
        sort          : true
    },
    {
        id            : 'active',
        align         : 'right',
        disablePadding: false,
        label         : 'Active',
        sort          : true
    }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class ExamDefineListTableHead extends React.Component {
    state = {
        selectedTopicsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedTopicsMenu = (event) => {
        this.setState({selectedTopicsMenu: event.currentTarget});
    };

    closeSelectedTopicsMenu = () => {
        this.setState({selectedTopicsMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedTopicsMenu} = this.state;

        return (
            <TableHead>
                <TableRow className="h-54">
                    <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                        {numSelected > 0 && (
                            <div className={classNames("flex items-center justify-center absolute w-64 pin-t pin-l ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                                <IconButton
                                    aria-owns={selectedTopicsMenu ? 'selectedTopicsMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedTopicsMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedTopicsMenu"
                                    anchorEl={selectedTopicsMenu}
                                    open={Boolean(selectedTopicsMenu)}
                                    onClose={this.closeSelectedTopicsMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                this.closeSelectedTopicsMenu();
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>delete</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Remove"/>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        )}
                    </TableCell>
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

export default withStyles(styles, {withTheme: true})(ExamDefineListTableHead);
