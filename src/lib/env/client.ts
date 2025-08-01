import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
