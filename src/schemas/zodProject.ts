import { z } from "zod";
export const projectSchema = z.object({ zipCode:z.string().regex(/^\d{5}$/,"Enter a valid 5-digit ZIP code."), projectType:z.string().min(1,"Select a project type."), projectArea:z.string().min(2,"Enter the room or area."), urgency:z.enum(["flexible","soon","urgent"]), permitLikely:z.enum(["yes","no","not_sure"]) });
export type ProjectFormValues = z.infer<typeof projectSchema>;
