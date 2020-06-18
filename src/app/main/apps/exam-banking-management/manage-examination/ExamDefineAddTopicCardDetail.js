import React, {Component} from 'react';
import {Button, ClickAwayListener, Icon, TextField} from "@material-ui/core";
import {FuseChipSelect} from '@fuse/index';
import _ from '@lodash';
import ExamDefineTopicModel from "./model/ExamDefineTopicPointModel";

const initialState = {
  formOpen: false,
  topicName: "",
  numberEasyQuestion: "",
  numberMediumQuestion: "",
  numberHardQuestion: "",
};

class ExamDefineAddTopicCardDetail extends Component {
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

  handleChipChange = (value, name) => {
    this.setState(_.set({...this.state}, name, value.value));
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    const {topicName, numberEasyQuestion, numberMediumQuestion, numberHardQuestion} = this.state;
    if (topicName === '') {
      return;
    }
    this.props.onCardAdded(new ExamDefineTopicModel({topicName, numberEasyQuestion, numberMediumQuestion, numberHardQuestion}));
    this.handleCloseForm();
  };

  canBeSubmitted() {
    const {topicName} = this.state;
    return (
      topicName.length > 0
    );
  }

  render() {
    const {topicNameOption} = this.props;
    const {formOpen} = this.state;
    return (
      <div className="w-full border-t-1">
        {formOpen ? (
          <ClickAwayListener onClickAway={this.handleCloseForm}>
            <form className="p-16" onSubmit={this.onSubmit}>
              <div className="flex">
                <FuseChipSelect
                  className="mt-8 mb-16 mr-20 w-1/5"
                  value={topicNameOption.filter(classRoom => classRoom.value === this.state.topicName)}
                  onChange={(value) => this.handleChipChange(value, 'topicName')}
                  placeholder="Chọn Chuyên đề"
                  textFieldProps={{
                    label: 'Chuyên đề',
                    InputLabelProps: {
                      shrink: true
                    },
                    variant: 'standard'
                  }}
                  options={topicNameOption}
                  isMulti={false}
                />
                <TextField
                  className="mt-8 mb-16 mr-20 w-1/5"
                  label="Số câu dễ"
                  //autoFocus
                  id="numberEasyQuestion"
                  name="numberEasyQuestion"
                  value={this.state.numberEasyQuestion}
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16 mr-20 w-1/5"
                  label="Số câu trung bình"
                  //autoFocus
                  id="numberMediumQuestion"
                  name="numberMediumQuestion"
                  value={this.state.numberMediumQuestion}
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16 mr-20 w-1/5"
                  label="Số câu khó"
                  //autoFocus
                  id="numberHardQuestion"
                  name="numberHardQuestion"
                  value={this.state.numberHardQuestion}
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                />
                <Button
                  className="mt-8 mb-16 mr-20 w-1/5"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={!this.canBeSubmitted()}
                >
                  Add
                </Button>
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
            Thêm mới chuyên đề
          </Button>
        )}
      </div>
    );
  }
}

export default ExamDefineAddTopicCardDetail;
