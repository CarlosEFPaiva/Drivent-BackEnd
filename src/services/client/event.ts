import Accomodation from "@/entities/Accomodation";
import Setting from "@/entities/Setting";
import Ticket from "@/entities/Ticket";

export async function getEventInfo() {
  return await Setting.getEventSettings();
}

export async function getTicketsAndAccomodationsInfo() {
  return {
    tickets: await Ticket.getTicketsInfo(),
    accomodations: await Accomodation.getAccomodationsInfo(),
  };
}
