import Event from "@/entities/Event";
import ConflictError from "@/errors/ConflictError";

export async function subscribe(userId: number, eventId: number) {
  const subscribedEvent = await Event.findConflictingTalks(userId, eventId);
  if (subscribedEvent) {
    throw new ConflictError("There are other talks scheduled for the same time");
  }
  return;
}
