import React, { Component } from "react";

// components
import ClassSingle from "./newSession_preview--classSingle";

class DayList extends Component {
    render() {
        const classes = this.props.classes;

        return (
            <ul className="borderBottomList">
                <div className="borderBottomList_title">{`週${this.props.day.toLocaleString(
                    "zh-u-nu-hanidec"
                )}`}</div>
                <div className="contentWrapper">
                    {classes.length
                        ? classes.map((info, i) => {
                              return (
                                  <li>
                                      <ClassSingle
                                          class={info.date}
                                          deleteClassWhenPreview={
                                              this.props.deleteClassWhenPreview
                                          }
                                          key={i}
                                      />
                                  </li>
                              );
                          })
                        : null}
                </div>
            </ul>
        );
    }
}

export default DayList;
