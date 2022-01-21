/* eslint-disable padded-blocks */

import * as enrollmentService from "../../../src/services/client/enrollment";
import Enrollment from "../../../src/entities/Enrollment";
import { UserResult } from "../../protocols/user";

const sut = enrollmentService;
describe("Unit tests for service/enrollment.ts", () => {

  describe("createNewEnrollment function", () => {

    test("should return an updated User Entity", async() => {
      
      const validUser = new UserResult(1, "teste@gmail.com", { id: 2, name: "enrolled" });
      
      jest.spyOn(Enrollment, "createOrUpdate").mockImplementationOnce(async(): Promise<UserResult> => validUser );
      
      const result = await sut.createNewEnrollment(null);

      expect(result).toEqual(validUser);
    });
  });

  describe("getEnrollmentWithAddress function", () => {

    test("should return an object with atributes 'tickets' and 'accomodations'", async() => {
      
      const validEnrollment = new Enrollment();
      
      jest.spyOn(Enrollment, "getByUserIdWithAddress").mockImplementationOnce(async(): Promise<Enrollment> => validEnrollment);
      
      const result = await sut.getEnrollmentWithAddress(2);

      expect(result).toEqual(validEnrollment);
    });
  });
});
