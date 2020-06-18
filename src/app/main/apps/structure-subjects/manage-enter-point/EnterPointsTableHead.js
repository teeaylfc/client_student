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
        id            : 'id',
        align         : 'left',
        disablePadding: false,
        label         : 'Mã học sinh',
        sort          : true
    },
    {
        id            : 'name',
        align         : 'left',
        disablePadding: false,
        label         : 'Họ tên',
        sort          : true
    },
    {
        id            : 'birthday',
        align         : 'left',
        disablePadding: false,
        label         : 'Ngày sinh',
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
        id            : 'active',
        align         : 'right',
        disablePadding: false,
        label         : '#',
        sort          : true
    }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class EnterPointsTableHead extends React.Component {
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

export default withStyles(styles, {withTheme: true})(EnterPointsTableHead);
