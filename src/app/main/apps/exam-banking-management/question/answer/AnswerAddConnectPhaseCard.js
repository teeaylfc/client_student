import React, {Component} from 'react';
import {Button, ClickAwayListener, Icon, IconButton, InputAdornment, TextField} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import AnswerModel from "../model/AnswerModel";

const initialState = {
  formOpen: false,
  answerValue: "",
  answerValueMatch: "",
  checked: false
};

class AnswerAddConnectPhaseCard extends Component {

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

  onSubmit = (ev) => {
    ev.preventDefault();
    const {answerValue, answerValueMatch} = this.state;
    const checked = false;
    this.props.onCardAdded(new AnswerModel({checked, answerValue, answerValueMatch}));
    this.handleCloseForm();
  };

  canBeSubmitted() {
    const {answerValue, answerValueMatch} = this.state;
    return (
      answerValue.length > 0 || answerValueMatch.length > 0
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
                <TextField
                  className="mt-8 mb-16 mr-20"
                  fullWidth
                  label="Câu trả lời"
                  autoFocus
                  name="answerValue"
                  id="answerValue"
                  value={this.state.answerValue}
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
                <TextField
                  className="mt-8 mb-16 mr-20"
                  fullWidth
                  label="Câu trả lời"
                  name="answerValueMatch"
                  id="answerValueMatch"
                  value={this.state.answerValueMatch}
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

                <div className="flex justify-between items-center">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={!this.canBeSubmitted()}
                  >
                    Add
                  </Button>
                </div>
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

export default withRouter(connect(mapStateToProps)(AnswerAddConnectPhaseCard));
