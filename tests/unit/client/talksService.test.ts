/* eslint-disable no-undef */
/* eslint-disable padded-blocks */

import * as talksService from "../../../src/services/client/talks";
import Event from "../../../src/entities/Event";
import UserEvent from "../../../src/entities/UsersEvents";
import NotFoundError from "../../../src/errors/NotFoundError";
import InvalidDataError from "../../../src/errors/InvalidData";
import User from "../../../src/entities/User";
import Date from "../../../src/entities/Date";
import { EventTest } from "../../protocols/event";
import { DateResult } from "../../protocols/date";

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

    test("should throw InvalidDataError when event has no vacancies left", async() => {
      jest.spyOn(Event, "findOne").mockImplementationOnce((async(): Promise<Event> => new EventTest(1, 0)));
      jest.spyOn(UserEvent, "unsubscribeUser").mockImplementation(async(): Promise<number> => 0);
      
      const promise = sut.unsubscribe(1, 1);

      await expect(promise).rejects.toThrowError(InvalidDataError);
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

  describe("getDates function", () => {

    test("should not throw any errors and return Date[] in case of success", async () => {
      const expectedResult = [new DateResult(1, "10-22-2022", [new Event()]), new DateResult(2, "10-23-2022", [new Event()])];
      jest.spyOn(Date, "find").mockImplementationOnce((async(): Promise<DateResult[]> => expectedResult));
      
      const result = await sut.getDates();

      expect(result).toEqual(expectedResult);
    });

    test("should throw NotFoundError when no dates are found", async() => {
      jest.spyOn(Date, "find").mockImplementationOnce((async(): Promise<DateResult[]> => []));
      
      const promise = sut.getDates();

      await expect(promise).rejects.toThrowError(NotFoundError);
    });
  });

  describe("getDates function", () => {

    test("should not throw any errors and return Date[] in case of success", async() => {
      const expectedResult = [new DateResult(1, "10-22-2022", [new Event()]), new DateResult(2, "10-23-2022", [new Event()])];
      jest.spyOn(Date, "find").mockImplementationOnce((async(): Promise<DateResult[]> => expectedResult));
      
      const result = await sut.getDates();

      expect(result).toEqual(expectedResult);
    });

    test("should throw NotFoundError when no dates are found", async() => {
      jest.spyOn(Date, "find").mockImplementationOnce((async(): Promise<DateResult[]> => []));
      
      const promise = sut.getDates();

      await expect(promise).rejects.toThrowError(NotFoundError);
    });
  });

    describe("getDates function", () => {

    test("should not throw any errors and return Date[] in case of success", async () => {
      const expectedResult = [new DateResult(1, "10-22-2022", [new Event()]), new DateResult(2, "10-23-2022", [new Event()])];
      jest.spyOn(Date, "find").mockImplementationOnce((async(): Promise<DateResult[]> => expectedResult));
      
      const result = await sut.getDates();

      expect(result).toEqual(expectedResult);
    });

    test("should throw NotFoundError when no dates are found", async() => {
      jest.spyOn(Date, "find").mockImplementationOnce((async(): Promise<DateResult[]> => []));
      
      const promise = sut.getDates();

      await expect(promise).rejects.toThrowError(NotFoundError);
    });
  });

  describe("getEventsByDayId function", () => {

    jest.spyOn(UserEvent, "createUserEventHashtable").mockImplementationOnce((async(): Promise<Record<string, boolean>> => ({ "8": true })));
    
    test("should not throw any errors and return {...Event, isUserSubscribed}[] in case of success", async() => {
      const expectedDateResult = new DateResult(1, "10-22-2022", [new EventTest(1, 40), new EventTest(8, 20)]);
      jest.spyOn(Date, "findOne").mockImplementationOnce((async(): Promise<DateResult> => expectedDateResult));

      const result = await sut.getEventsByDayId(1, 1);
      const expectedResult = [{ ...expectedDateResult.events[0], isUserSubscribed: false }, { ...expectedDateResult.events[1], isUserSubscribed: true }];
      expect(result).toEqual(expectedResult);
    });

    test("should throw NotFoundError when no date is found", async() => {
      jest.spyOn(Date, "findOne").mockImplementationOnce((async(): Promise<DateResult> => null));
      
      const promise = sut.getEventsByDayId(1, 1);

      await expect(promise).rejects.toThrowError(NotFoundError);
    });

    test("should throw NotFoundError when found date has no events", async() => {
      const expectedDateResult = new DateResult(1, "10-22-2022", []);
      jest.spyOn(Date, "findOne").mockImplementationOnce((async(): Promise<DateResult> => expectedDateResult));
      
      const promise = sut.getEventsByDayId(1, 1);

      await expect(promise).rejects.toThrowError(NotFoundError);
    });
  });

});
