import Event from "@/entities/Event";
import User from "@/entities/User";
import UserEvent from "@/entities/UsersEvents";
import ConflictError from "@/errors/ConflictError";
import NotFoundError from "@/errors/NotFoundError";

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
