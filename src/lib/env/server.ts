import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  server: {
    DB_FILE_NAME: z.string(),

    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
