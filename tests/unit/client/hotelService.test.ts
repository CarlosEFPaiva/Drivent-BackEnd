/* eslint-disable padded-blocks */

import * as hotelService from "../../../src/services/client/hotel";
import Hotels from "../../../src/entities/Hotels";
import { HotelResult } from "../../protocols/hotel";
import { RoomResult } from "../../protocols/room";
import { RoomTypeResult } from "../../protocols/roomType";
// import { UserResult } from "../../protocols/user";

const sut = hotelService;
describe("Unit tests for service/hotel.ts", () => {

  describe("getHotelsInfo function", () => {

    test("should return an Hotel Entity with roomsAvailable", async() => {
      
      const validRoomType = new RoomTypeResult(1, "single", 1);
      const validRoom = new RoomResult(1, 101, 1, 0, validRoomType);
      const validHotel = new HotelResult(1, "Driven Hotel", "description", "http://image.com", [validRoom]);
      
      jest.spyOn(Hotels, "getHotelsInfos").mockImplementationOnce(async(): Promise<HotelResult[]> => [validHotel]);
      jest.spyOn(Hotels, "getRoomsAvailable").mockImplementationOnce(async(): Promise<number> => 1);
      
      const result = await sut.getHotelsInfo();

      expect(result).toEqual([{
        id: 1,
        name: "Driven Hotel",
        description: "description",
        imageUrl: "http://image.com",
        roomsAvailable: 1,
        rooms: [validRoom]
      }]);
    });
  });
});
