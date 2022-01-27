import joi from "joi";

export default joi.object({
  eventId: joi.number().min(1).required(), 
});
