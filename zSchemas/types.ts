import { z } from "zod";
import { PaginationLinks } from "./resources";

export type RootPaginatedResponse = {
  links: z.infer<typeof PaginationLinks>;
}
