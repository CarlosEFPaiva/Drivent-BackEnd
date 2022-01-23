import User from "@/entities/User";

export async function reserveTicket(userId: number, ticketId: number, accomodationId: number) {
  const user = await User.updateTicketAndAccomodation(userId, ticketId, accomodationId);
  return user.getMainAtributes();
}

export async function confirmPayment(userId: number) {
  const user = await User.updateStatusAndConfirmPayment(userId);
  return user.getMainAtributes();
}
