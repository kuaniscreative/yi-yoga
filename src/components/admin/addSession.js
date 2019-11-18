import React, { Component } from "react";

// components
import SetPeriod from "./addSession_setPeriod";
import NewSessionForm from "./newSession_form";

// functions
import { uidGenerator } from "../../functions/uid";

class AddSession extends Component {
    state = {
        period: [],
        classes: [],
        regularSession: [
            { day: 1, hour: 19, minute: 20, name: "星期一 19:20 - 20:20" },
            { day: 1, hour: 20, minute: 30, name: "星期一 20:30 - 21:30" },
            { day: 2, hour: 19, minute: 20, name: "星期二 19:10 - 20:10" },
            { day: 2, hour: 20, minute: 30, name: "星期二 20:30 - 21:30" },
            { day: 4, hour: 18, minute: 50, name: "星期四 18:50 - 19:50" },
            { day: 5, hour: 19, minute: 30, name: "星期五 19:30 - 20:30" }
        ],
        periodInputIsValid: true
    };

    getSession = (start, end) => {
        const startDate = new Date(start.year, start.month - 1, 1);
        const endDate = new Date(end.year, end.month, 0);
        const regularSession = this.state.regularSession;
        const targets = [];

        // get the classes and push them to targets
        while (startDate.valueOf() !== endDate.valueOf()) {
            switch (startDate.getDay()) {
                case 1:
                    (() => {
                        let t = regularSession.filter(item => {
                            return item.day === 1;
                        });
                        t.forEach(item => {
                            const d = new Date(
                                startDate.getFullYear(),
                                startDate.getMonth(),
                                startDate.getDate(),
                                item.hour,
                                item.minute
                            );
                            d.id = uidGenerator();
                            targets.push(d);
                        });
                    })();
                    break;
                case 2:
                    (() => {
                        let t = regularSession.filter(item => {
                            return item.day === 2;
                        });
                        t.forEach(item => {
                            const d = new Date(
                                startDate.getFullYear(),
                                startDate.getMonth(),
                                startDate.getDate(),
                                item.hour,
                                item.minute
                            );
                            d.id = uidGenerator();
                            targets.push(d);
                        });
                    })();
                    break;
                case 4:
                    (() => {
                        let t = regularSession.filter(item => {
                            return item.day === 4;
                        });
                        t.forEach(item => {
                            const d = new Date(
                                startDate.getFullYear(),
                                startDate.getMonth(),
                                startDate.getDate(),
                                item.hour,
                                item.minute
                            );
                            d.id = uidGenerator();
                            targets.push(d);
                        });
                    })();
                    break;
                case 5:
                    (() => {
                        let t = regularSession.filter(item => {
                            return item.day === 5;
                        });
                        t.forEach(item => {
                            const d = new Date(
                                startDate.getFullYear(),
                                startDate.getMonth(),
                                startDate.getDate(),
                                item.hour,
                                item.minute
                            );
                            d.id = uidGenerator();
                            targets.push(d);
                        });
                    })();
                    break;
            }

            startDate.setDate(startDate.getDate() + 1);
        }
        return targets;
    };

    render() {
        return (
            <div>
                <SetPeriod />
            </div>
        );
    }
}

export default AddSession;
