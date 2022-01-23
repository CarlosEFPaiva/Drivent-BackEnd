import Rooms from "@/entities/Rooms";
import User from "@/entities/User";
import { getConnection } from "typeorm";

export async function saveRoom(selectedRoom: number, userId: number) {
  const oldRoom = await Rooms.getRoomUser(userId);
  const newRoom = await Rooms.getRoomById(selectedRoom);

  if (oldRoom !== null) {
    await getConnection().createQueryBuilder().update(Rooms)
      .set({ occupation: oldRoom[0].occupation - 1 })
      .where("id= :id", { id: oldRoom[0].id })
      .execute();
  }

  await getConnection().createQueryBuilder().update(Rooms)
    .set({ occupation: newRoom.occupation + 1 })
    .where("id= :id", { id: newRoom.id })
    .execute();

  await getConnection().createQueryBuilder().update(User)
    .set({ roomId: selectedRoom })
    .where("id= :id", { id: userId })
    .execute();

  return ("ok");
}
