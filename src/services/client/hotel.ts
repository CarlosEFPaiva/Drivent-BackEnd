import Hotels from "@/entities/Hotels";

export async function getHotelsInfo() {
  const result = await Hotels.getHotelsInfos();
  const hotels = await Promise.all(result.map(async(hotel) => {
    const roomsAvailable = await Hotels.getRoomsAvailable(hotel.rooms);
    return({
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      imageUrl: hotel.imageUrl,
      roomsAvailable: roomsAvailable,
      rooms: hotel.sortRoomsByNumber(),
    });
  })); 
  return hotels;
}
