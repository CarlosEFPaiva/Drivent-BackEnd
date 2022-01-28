/* eslint-disable padded-blocks */

import * as talksService from "../../../src/services/client/talks";
import Event from "../../../src/entities/Event";
import UserEvent from "../../../src/entities/UsersEvents";
import NotFoundError from "../../../src/errors/NotFoundError";
import InvalidDataError from "../../../src/errors/InvalidData";
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

      await expect(promise).rejects.toThrowError(NotFoundError);
    });

  });

  describe("unsubscribe function", () => {

    jest.spyOn(User, "findOne").mockImplementation(async(): Promise<User> => new User());

    test("should not throw any errors and return 'void' in case of success", async() => {
      jest.spyOn(Event, "findOne").mockImplementationOnce((async(): Promise<Event> => new Event()));
      jest.spyOn(UserEvent, "unsubscribeUser").mockImplementation(async(): Promise<number> => 1);
      
      const result = await sut.unsubscribe(1, 1);

      expect(result).toEqual(undefined);
    });

    test("should throw NotFoundError when no event is found for given id", async() => {
      jest.spyOn(Event, "findOne").mockImplementationOnce((async(): Promise<Event> => null));
      jest.spyOn(UserEvent, "unsubscribeUser").mockImplementation(async(): Promise<number> => 1);
      
      const promise = sut.unsubscribe(1, 1);

      await expect(promise).rejects.toThrowError(NotFoundError);
    });

    test("should throw InvalidDataError when no event is found for given id", async() => {
      jest.spyOn(Event, "findOne").mockImplementationOnce((async(): Promise<Event> => new Event()));
      jest.spyOn(UserEvent, "unsubscribeUser").mockImplementation(async(): Promise<number> => 0);
      
      const promise = sut.unsubscribe(1, 1);

      await expect(promise).rejects.toThrowError(InvalidDataError);
    });

  });
});
