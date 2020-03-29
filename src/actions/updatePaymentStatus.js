import firebase from '../fbConfig';
const firestore = firebase.firestore();

export default function updatePaymentStatus(paymentId, method, account, date) {
  return firestore
    .collection('paymentStatus')
    .doc(paymentId)
    .update({
      method: method,
      account: account,
      date: date,
      moneySent: true
    });
}
