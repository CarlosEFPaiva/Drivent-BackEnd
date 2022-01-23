import joi from "joi";

export default joi.object({
  ticketId: joi.number().min(1).max(2).required(), 
  accomodationId: joi.number().min(1).max(2).required(),
});
