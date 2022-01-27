import Event from "@/entities/Event";
import User from "@/entities/User";
import UserEvent from "@/entities/UsersEvents";
import ConflictError from "@/errors/ConflictError";
import NotFoundError from "@/errors/NotFoundError";
import Date from "@/entities/Date";

export async function subscribe(userId: number, eventId: number) {
  const eventToBeSubscribed = await Event.findOne({ id: eventId });

  if (!eventToBeSubscribed) {
    throw new NotFoundError();
  }

  const user = await User.findOne({ id: userId });
  const conflictingEvent = await eventToBeSubscribed.findConflictingTalks(user);

  if (conflictingEvent) {
    throw new ConflictError("There are other talks scheduled for the same time");
  }
  
  await UserEvent.createSubscription(user, eventToBeSubscribed);
  return;
}

export async function getDates() {
  const dates = await Date.find();

  return dates;
}

export async function getEventsByDayId(id: number) {
  const dates = await Date.findOne({ 
    where: {
      id
    },
    relations: ["events"]
  });

  if(dates.events.length === 0) {
    throw new NotFoundError();
  }
  return dates.events;
}
