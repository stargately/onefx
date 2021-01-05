import { config } from "dotenv";

config();

export function getEnvVar(
  varName: string,
  defaultValue?: string,
  isHardDependency?: boolean
): string {
  const val = process.env[varName];
  if (!val) {
    if (isHardDependency) {
      throw new Error(
        `missing hard dependency ${varName} in .env environment variables`
      );
    } else {
      console.warn(
        `missing soft dependency ${varName} in .env environment variables`
      );
    }
  }
  return (val !== undefined ? val : defaultValue) || "";
}
