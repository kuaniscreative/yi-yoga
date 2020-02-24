export const combinePaymentsWithSession = (payments, sessions) => {
  if (!payments.length || !sessions.length) {
    return [];
  }
  const sorting = {};
  payments.forEach((payment) => {
    const session = payment.sessionId;
    const status = payment.moneyReceived
      ? 'finished'
      : payment.moneySent
      ? 'paid'
      : 'pending';

    if (sorting[session]) {
      sorting[session][status].push(payment);
    } else {
      sorting[session] = {
        finished: [],
        paid: [],
        pending: []
      };
      sorting[session][status].push(payment);
    }
  });

  return sessions.map((session) => {
    return {
      ...session,
      payments: sorting[session.id]
    };
  });
};

export const getVieingPayments = (sessionData, sessionId, type) => {
  if (sessionId === undefined || type === undefined) {
    return [];
  }
  return sessionData.find((session) => {
    return sessionId === session.id;
  }).payments[type];
};
