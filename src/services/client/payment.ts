import User from "@/entities/User";

export async function reserveTicket(userId: number, ticketId: number, accomodationId: number) {
  let user = await User.findById(userId);
  user = await user.updateTicketAndAccomodation(ticketId, accomodationId);
  return user.getMainAtributes();
}
