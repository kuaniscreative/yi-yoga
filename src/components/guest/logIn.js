import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// components
import NextStepButtonsArea from "../ui/nextStepButtonArea";

// actions
import { signIn } from "../../actions/authActions";

class LogIn extends Component {
    state = {
        email: null,
        password: null
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.signIn(this.state);
    };

    render() {
        return (
            <div>
                <div className="layout_pageTitle">
                    <div className="wrapper">
                        <h1>登入</h1>
                    </div>
                </div>
                <div className='layout_contentBlock'>
                <form
                    className="comfyForm innerContent"
                    onSubmit={this.handleSubmit}
                >
                    <label>帳號</label>
                    <input
                        name="email"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <label>密碼</label>
                    <input
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <NextStepButtonsArea
                        cancel={e => {
                            e.preventDefault();
                            this.props.history.push("/");
                        }}
                    />
                </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        test: state.firebase
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: cred => {
            dispatch({ type: "LOADING" });
            dispatch(signIn(cred));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));