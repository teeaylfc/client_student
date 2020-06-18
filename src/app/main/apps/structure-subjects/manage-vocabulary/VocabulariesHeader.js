import React, {Component} from 'react';
import {Paper, Button, Input, Icon, Typography, MuiThemeProvider, Select, MenuItem} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions';
import {TABLE_HEADERS_VOCABULARY} from "../../../../../common/Constants"

const fields = TABLE_HEADERS_VOCABULARY.slice(0,-1)
class VocabulariesHeader extends Component {
    state = {
        field: fields[0].id,
    }

    constructor(props) {
        super(props);
        this.props.setField({target: {value: fields[0].id}})
    }

    handleSelectField = event => {
        this.setState({field: event.target.value})
        this.props.setField(event)
    }

    render () {
        const {setSearchText, searchText, mainTheme} = this.props;
    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="header-right-top-desc flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="mr-7 sm:mr-12">shopping_basket</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Danh sách từ vựng</Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

                <MuiThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideDownIn" delay={300}>
                        <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder="Search"
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={setSearchText}
                            />
                            <Select value={this.state.field} onChange={this.handleSelectField}>
                                {fields.map(f => {
                                    return (
                                    <MenuItem value={f.id}>{f.label}</MenuItem>
                                    )
                                })}
                            </Select>
                        </Paper>
                    </FuseAnimate>
                </MuiThemeProvider>

            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button component={Link} to="/vocabulary/new" className="whitespace-no-wrap" variant="contained">
                    <span className="hidden sm:flex">Tạo từ vựng</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </FuseAnimate>
        </div>
    );
    }
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setField: Actions.setVocabularyField,
        setSearchText: Actions.setVocabularySearchText
    }, dispatch);
}

function mapStateToProps({vocabularyApp, fuse})
{
    console.log('vocabularyApp', vocabularyApp);
    return {
        field: vocabularyApp.vocabularies.field,
        searchText: vocabularyApp.vocabularies.searchText,
        mainTheme : fuse.settings.mainTheme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabulariesHeader);
