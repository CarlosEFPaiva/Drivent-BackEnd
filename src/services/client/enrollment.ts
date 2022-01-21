import EnrollmentData from "@/interfaces/enrollment";
import Enrollment from "@/entities/Enrollment";

export function createNewEnrollment(enrollmentData: EnrollmentData) {
  return Enrollment.createOrUpdate(enrollmentData);
}

export async function getEnrollmentWithAddress(userId: number) {
  return await Enrollment.getByUserIdWithAddress(userId);
}
