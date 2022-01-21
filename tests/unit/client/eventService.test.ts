/* eslint-disable padded-blocks */

import * as eventService from "../../../src/services/client/event";
import Accomodation from "../../../src/entities/Accomodation";
import Ticket from "../../../src/entities/Ticket";
import Setting from "../../../src/entities/Setting";

const sut = eventService;
describe("Unit tests for service/event.ts", () => {

  describe("getEventInfo function", () => {

    test("should return an object with atributes 'startDate', 'endDate', 'eventTitle', 'backgroundImage', 'logoImage'", async() => {
      jest.spyOn(Setting, "getEventSettings").mockImplementationOnce(async() => {
        return ({
          startDate: new Date("01/01/2022"),
          endDate: new Date("02/01/2022"),
          eventTitle: "event_title",
          backgroundImage: "background_image",
          logoImage: "logo_image",
        });
      } );
      
      const result = await sut.getEventInfo();
      const expectedResult = {
        startDate: new Date("01/01/2022"),
        endDate: new Date("02/01/2022"),
        eventTitle: "event_title",
        backgroundImage: "background_image",
        logoImage: "logo_image",
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe("getTicketsAndAccomodationsInfo function", () => {

    test("should return an object with atributes 'tickets' and 'accomodations'", async() => {
      jest.spyOn(Ticket, "getTicketsInfo").mockImplementationOnce(async() => [{ id: 1, name: "test", price: "200" }, { id: 2, name: "example", price: "100" }] );
      jest.spyOn(Accomodation, "getAccomodationsInfo").mockImplementationOnce(async() => [{ id: 3, name: "test", price: "0" }, { id: 4, name: "example", price: "300" }]);

      const result = await sut.getTicketsAndAccomodationsInfo();
      const expectedResult = {
        tickets: [{ id: 1, name: "test", price: "200" }, { id: 2, name: "example", price: "100" }],
        accomodations: [{ id: 3, name: "test", price: "0" }, { id: 4, name: "example", price: "300" }],
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
