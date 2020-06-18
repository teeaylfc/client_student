import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, Icon, TextField} from "@material-ui/core";
import {Droppable} from "react-beautiful-dnd";
import ExamDefineTopicCardDetail from "./ExamDefineTopicCardDetail";


const styles = theme => ({
  card: {
    transitionProperty      : 'box-shadow',
    transitionDuration      : theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  }
});

class ExamDefineTopicCardList extends Component {

  render() {
    const {classes, index, topicList, topicNameList} = this.props;
    const {formOpen, form} = this.state;

    return (
      <div>
        {formOpen ? (
          <Card className="w-full mb-16">
            <CardContent className="flex">
                <Card square={true}>
                  <CardContent
                    className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto"
                  >
                    <div className="flex flex-col w-full h-full p-16">
                      {topicList.map((topic) => (
                        <ExamDefineTopicCardList
                          topic={topic}
                        />
                      ))}
                    </div>

                  </CardContent>

                  <CardActions className="p-0 flex-no-shrink">
                    <ExamDefineTopicCardDetail/>
                  </CardActions>
                </Card>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={this.onSubmit}>
                Add Question
              </Button>
            </CardActions>
          </Card>
        ) : (
          <Button
            onClick={this.handleOpenForm}
            classes={{
              root: "normal-case font-600 w-full rounded-none h-48",
              label: "justify-start"
            }}
          >
            <Icon className="text-20 mr-8">add</Icon>
            Add a Question
          </Button>
        )}
      </div>
    );
  }
}

export default ExamDefineTopicCardList;
