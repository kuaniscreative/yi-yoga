export const combinePaymentsWithSession = (payments, sessions) => {
  if (!payments.length || !sessions.length) {
    return [];
  }
  const sorting = {};
  payments.forEach((payment) => {
    const session = payment.sessionId;
    if (sorting[session]) {
      sorting[session].push(payment);
    } else {
      sorting[session] = [payment];
    }
  });
  return sessions.map((session) => {
    return {
      ...session,
      payments: sorting[session.id]
    };
  });
};
