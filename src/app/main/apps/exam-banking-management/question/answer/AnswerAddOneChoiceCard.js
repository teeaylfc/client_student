import React, {Component} from 'react';
import {
  Button,
  IconButton,
  Icon,
  TextField,
  ClickAwayListener,
  InputAdornment,
  Radio,
  Grid,
  Divider
} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import AnswerModel from "../model/AnswerModel";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

const initialState = {
  formOpen: false,
  answerValue: "",
  answerDescription: "",
  checked: false
};

class AnswerOneChoiceCard extends Component {

  state = initialState;

  handleOpenForm = () => {
    this.setState({formOpen: true})
  };

  handleCloseForm = () => {
    this.setState({...initialState})
  };

  handleChange = (event) => {
    this.setState(_.set({...this.state}, event.target.name, (event.target.type === 'checkbox' || event.target.type === 'radio' ) ? event.target.checked : event.target.value));
  };

  handleChangeAnswer = (data) => {
    this.setState(_.set(_.set({...this.state}, 'answerValue', data)));
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    const {checked, answerValue, answerDescription} = this.state;
    this.props.onCardAdded(new AnswerModel({checked, answerValue, answerDescription}));
    this.handleCloseForm();
  };

  canBeSubmitted() {
    const {answerValue} = this.state;
    return (
      answerValue.length > 0
    );
  }

  render() {
    const {formOpen} = this.state;

    return (
      <div className="w-full border-t-1">
        {formOpen ? (
          <ClickAwayListener onClickAway={this.handleCloseForm}>
            <form className="p-16" onSubmit={this.onSubmit}>
              <div className="flex">
                <Grid container direction="row"
                      justify="space-evenly"
                      alignItems="center">
                  <Grid item xs={2} sm={1}>
                    <Radio
                        checked={this.state.checked}
                        name="checked"
                        onChange={this.handleChange}
                        variant="outlined"
                        className="mt-8 mb-16 mr-20"
                    />
                  </Grid>
                  <Grid item xs={6} sm={8} >
                    <div className="row">
                      <CKEditor
                          editor={ ClassicEditor }
                          data={this.state.answerValue}
                          id="answerValue"
                          name="answerValue"
                          onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            const data = editor.getData();
                          } }
                          onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this.handleChangeAnswer(data);
                          } }
                          onBlur={ editor => {
                            console.log( 'Blur.', editor );
                          } }
                          onFocus={ editor => {
                            console.log( 'Focus.', editor );
                          } }
                      />
                      <TextField
                          className="mt-8 mb-16 mr-20"
                          fullWidth
                          label="Ghi chú cho đáp án đúng"
                          id="answerDescription"
                          name="answerDescription"
                          value={this.state.answerDescription}
                          onChange={this.handleChange}
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={this.handleCloseForm}>
                                    <Icon className="text-18">close</Icon>
                                  </IconButton>
                                </InputAdornment>
                            )
                          }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2} sm={1}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        disabled={!this.canBeSubmitted()}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
                <Divider/>
              </div>
            </form>
          </ClickAwayListener>
        ) : (
          <Button
            onClick={this.handleOpenForm}
            classes={{
              root: "normal-case font-600 w-full rounded-none h-48",
              label: "justify-start"
            }}
          >
            <Icon className="text-20 mr-8">add</Icon>
            Add a Answer
          </Button>
        )}
      </div>
    );
  }
}

function mapStateToProps({questionApp}) {
  return {
    question: questionApp.question
  }
}

export default withRouter(connect(mapStateToProps)(AnswerOneChoiceCard));
