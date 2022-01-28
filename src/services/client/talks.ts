import Event from "@/entities/Event";
import User from "@/entities/User";
import UserEvent from "@/entities/UsersEvents";
import InvalidDataError from "@/errors/InvalidData";
import NotFoundError from "@/errors/NotFoundError";

export async function subscribe(userId: number, eventId: number) {
  const eventToBeSubscribed = await Event.findOne({ id: eventId });

  if (!eventToBeSubscribed) {
    throw new NotFoundError();
  }

  if (eventToBeSubscribed.vacancies === 0) {
    throw new InvalidDataError("subscription", ["This event has no vacancies left"]);
  }

  const user = await User.findOne({ id: userId });
  await UserEvent.checkConflictAndCreateSubscription(user, eventToBeSubscribed);
}

export async function unsubscribe(userId: number, eventId: number) {
  const eventToBeUnsubscribed = await Event.findOne({ id: eventId });

  if (!eventToBeUnsubscribed) {
    throw new NotFoundError();
  }

  const user = await User.findOne({ id: userId });
  const deletedUserEvent = await UserEvent.unsubscribeUser(user, eventToBeUnsubscribed);

  if (!deletedUserEvent) {
    throw new InvalidDataError("UserEvent", ["user is not subscribed to this event"]);
  }
}
