/* eslint-disable padded-blocks */

import * as talksService from "../../../src/services/client/talks";
import Event from "../../../src/entities/Event";
import UserEvent from "../../../src/entities/UsersEvents";
import NotFoundError from "../../../src/errors/NotFoundError";
import User from "../../../src/entities/User";

const sut = talksService;

describe("Unit tests for service/talks.ts", () => {

  describe("subscribe function", () => {

    jest.spyOn(UserEvent, "checkConflictAndCreateSubscription").mockImplementation(async(): Promise<void> => null);
    jest.spyOn(User, "findOne").mockImplementation(async(): Promise<User> => new User());

    test("should not throw any errors and return 'void' in case of success", async() => {
      jest.spyOn(Event, "findOne").mockImplementationOnce((async(): Promise<Event> => new Event()));
      
      const result = await sut.subscribe(1, 1);

      expect(result).toEqual(undefined);
    });

    test("should throw NotFoundError when no event is found for given id", async() => {
      jest.spyOn(Event, "findOne").mockImplementationOnce((async(): Promise<Event> => null));
      
      const promise = sut.subscribe(1, 1);

      expect(promise).rejects.toThrowError(NotFoundError);
    });

  });
});
