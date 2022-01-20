/* eslint-disable padded-blocks */

import * as authService from "../../../src/services/client/auth";

import jwt from "jsonwebtoken";
import UnauthorizedError from "../../../src/errors/Unauthorized";
import User from "../../../src/entities/User";
import Session from "../../../src/entities/Session";

import { UserResult } from "../../protocols/userProtocols";

const sut = authService;

describe("Unit tests for service/auth.ts", () => {

  jest.spyOn(jwt, "sign").mockImplementationOnce(() => "token");

  describe("signIn function", () => {

    jest.spyOn(Session, "createNew").mockImplementationOnce(async() => new Session());

    test("should return an object with atributes 'startDate', 'endDate', 'eventTitle', 'backgroundImage', 'logoImage' when user is found", async() => {
      
      const validUser = new UserResult( 1, "teste@gmail.com", { id: 1, name: "logged" });

      jest.spyOn(User, "findByEmailAndPassword").mockImplementationOnce(async(): Promise<UserResult> => validUser);
      
      const result = await sut.signIn("teste@gmail.com", "strong-password");
      const expectedResult = { user: validUser, token: "token" };

      expect(result).toEqual(expectedResult);
    });

    test("should throw UnauthorizedError when user is not found", async() => {

      jest.spyOn(User, "findByEmailAndPassword").mockImplementationOnce(async(): Promise<UserResult> => null);
      
      const promise = sut.signIn("teste@gmail.com", "strong-password");

      expect(promise).rejects.toThrowError(UnauthorizedError);
    });
  });
});
