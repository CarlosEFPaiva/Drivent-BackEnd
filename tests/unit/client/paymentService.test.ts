/* eslint-disable padded-blocks */

import * as paymentService from "../../../src/services/client/payment";
import User from "../../../src/entities/User";
import { UserResult } from "../../protocols/user";

const sut = paymentService;
describe("Unit tests for service/payment.ts", () => {

  describe("reserveTicket function", () => {

    const validUser = new UserResult(
      1,
      "teste@gmail.com",
      { id: 3, name: "reserved" },
      { id: 1, name: "Presencial", price: "250" },
      { id: 2, name: "Com Hotel", price: "350" }
    );

    test("should return an object with atributes 'tickets' and 'accomodations'", async() => {
      jest.spyOn(User, "updateTicketAndAccomodation").mockImplementationOnce((async(): Promise<UserResult> => validUser));
      
      const result = await sut.reserveTicket(1, 1, 2);

      expect(result).toEqual(validUser);
    });
  });
});
