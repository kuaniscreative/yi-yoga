import React from "react";
import { Link } from 'react-router-dom';

const PaymentSingle = ({ infos }) => {
    const status = infos.moneyReceived
        ? "finished"
        : infos.moneySent
        ? "confirmPending"
        : "unpaid";
    const statusOuput = () => {
        switch (status) {
            case "unpaid":
                return (
                    <ul className="comfyList">
                        <li>
                            未繳費。如果已繳費，
                            <Link to={`/payment/${infos.id}`}>
                            <span className="action">點此通知芝伊</span>
                            </Link>
                        </li>
                    </ul>
                );
            case "confirmPending":
                return (
                    <ul className="comfyList">
                        <li>已繳費，等待芝伊確認</li>
                    </ul>
                );
            case "finished":
                return (
                    <ul className="comfyList">
                        <li>已完成，放心上課囉～</li>
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div className="paymentSingle">
            <p name="title">{infos.session}</p>
            {statusOuput()}
        </div>
    );
};

export default PaymentSingle;
