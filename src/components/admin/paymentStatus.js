import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class PaymentStatus extends Component {
    state = {
        modalData: null
    };

    handleClick = (key, name, payments) => {
        this.setModaldata(key, name, payments, this.openModal);
    };

    openModal = () => {
        const modal = document.getElementById("paymentModalWrapper");
        modal.classList.add("active");
    };

    setModaldata = (key, name, payments, callback) => {
        this.setState(
            {
                ...this.state,
                modalData: {
                    key: key,
                    name: name,
                    payments: payments
                }
            },
            callback
        );
    };

    closeModal = e => {
        const modal = document.getElementById("paymentModalWrapper");
        if (
            e.target.id === "paymentModalWrapper" ||
            e.target.id === "paymentModal_closeBtn"
        ) {
            modal.classList.remove("active");
        }
    };

    render() {
        const data = this.props.data;
        return (
            <div>
                <div className="layout_pageTitle">
                    <div className="wrapper">
                        <h1>付款狀況</h1>
                    </div>
                </div>
                <div className="layout_contentBlock">
                    {data
                        ? data.map((sessionInfo, i) => {
                              return (
                                  <div key={i}>
                                      <p>{sessionInfo.name}</p>
                                      <button
                                          onClick={() => {
                                              this.handleClick(
                                                  "未付款",
                                                  sessionInfo.name,
                                                  sessionInfo.unpaid
                                              );
                                          }}
                                      >
                                          未付款：
                                          <span>
                                              {sessionInfo.unpaid.length}
                                          </span>
                                      </button>
                                      <button
                                          onClick={() => {
                                              this.handleClick(
                                                  "待確認",
                                                  sessionInfo.name,
                                                  sessionInfo.uncheck
                                              );
                                          }}
                                      >
                                          待確認：
                                          <span>
                                              {sessionInfo.uncheck.length}
                                          </span>
                                      </button>
                                      <button
                                          onClick={() => {
                                              this.handleClick(
                                                  "已完成",
                                                  sessionInfo.name,
                                                  sessionInfo.finished
                                              );
                                          }}
                                      >
                                          已完成：
                                          <span>
                                              {sessionInfo.finished.length}
                                          </span>
                                      </button>
                                  </div>
                              );
                          })
                        : null}
                </div>
                {/**
                 *       燈箱
                 */}
                <div id="paymentModalWrapper" onClick={this.closeModal}>
                    {this.state.modalData ? (
                        <div id="paymentModal">
                            <div className="borderBottomList_title">
                                <h1>{this.state.modalData.key}</h1>
                                <p>{this.state.modalData.name}</p>
                            </div>
                            <ul className="borderBottomList">
                                {this.state.modalData.payments.map(
                                    (payment, i) => {
                                        return (
                                            <li key={i}>
                                                {payment.owner.nickName}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                            <button
                                id="paymentModal_closeBtn"
                                className="outlineButton"
                                onClick={this.closeModal}
                            >
                                關閉
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const session = state.firestore.ordered.session;
    const paymentStatus = state.firestore.ordered.paymentStatus;
    const user = state.firestore.ordered.user;
    const data =
        session && paymentStatus && user
            ? session.map(sessionInfo => {
                  const payments = paymentStatus
                      .filter(payment => {
                          return payment.sessionId === sessionInfo.id;
                      })
                      .map(payment => {
                          return {
                              ...payment,
                              owner: user.find(userInfo => {
                                  return userInfo.id === payment.owner;
                              })
                          };
                      });
                  const unpaid = [];
                  const uncheck = [];
                  const finished = [];
                  payments.forEach(paymentInfo => {
                      if (paymentInfo.moneySent && paymentInfo.moneyReveived) {
                          finished.push(paymentInfo);
                      } else if (paymentInfo.moneySent) {
                          uncheck.push(paymentInfo);
                      } else {
                          unpaid.push(paymentInfo);
                      }
                  });
                  return {
                      name: sessionInfo.name,
                      unpaid,
                      uncheck,
                      finished
                  };
              })
            : null;
    return {
        data
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "session" },
        { collection: "paymentStatus" },
        { collection: "user" }
    ])
)(PaymentStatus);
