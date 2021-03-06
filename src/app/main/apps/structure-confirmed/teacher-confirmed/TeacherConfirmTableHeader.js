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
        id            : 'teacherId',
        align         : 'left',
        disablePadding: false,
        label         : 'Mã đăng nhập',
        sort          : true
    },
    {
        id            : 'nameTeacher',
        align         : 'left',
        disablePadding: false,
        label         : 'Tên giáo viên',
        sort          : true
    },
    {
        id            : 'birthdayTeacher',
        align         : 'left',
        disablePadding: false,
        label         : 'Ngày sinh',
        sort          : true
    },
    {
        id            : 'genderTeacher',
        align         : 'right',
        disablePadding: false,
        label         : 'Giới tính',
        sort          : true
    },
    {
        id            : 'phoneTeacher',
        align         : 'right',
        disablePadding: false,
        label         : 'Số điện thoại',
        sort          : true
    },
    {
        id            : 'emailTeacher',
        align         : 'right',
        disablePadding: false,
        label         : 'Email',
        sort          : true
    },
    {
        id            : 'subjectName',
        align         : 'right',
        disablePadding: false,
        label         : 'Môn phụ trách',
        sort          : true
    },
    {
        id            : 'degreeTeacher',
        align         : 'right',
        disablePadding: false,
        label         : 'Bằng cấp',
        sort          : true
    },
    {
        id            : 'statusTeacher',
        align         : 'right',
        disablePadding: false,
        label         : 'Trạng thái',
        sort          : true
    },
    {
        id            : '',
        align         : 'right',
        disablePadding: false,
        label         : '#',
        sort          : false
    }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class TeacherConfirmTableHeader extends React.Component {
    state = {
        selectedClassesMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedClassesMenu = (event) => {
        this.setState({selectedClassesMenu: event.currentTarget});
    };

    closeSelectedClassesMenu = () => {
        this.setState({selectedClassesMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedClassesMenu} = this.state;

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
                                    aria-owns={selectedClassesMenu ? 'selectedClassesMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedClassesMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedClassesMenu"
                                    anchorEl={selectedClassesMenu}
                                    open={Boolean(selectedClassesMenu)}
                                    onClose={this.closeSelectedClassesMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                this.closeSelectedClassesMenu();
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

export default withStyles(styles, {withTheme: true})(TeacherConfirmTableHeader);
