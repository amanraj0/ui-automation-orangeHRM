export interface EnvironmentConfig {
  name: string;
  baseUrl: string;
  timeout: {
    navigation: number;
    actionTimeout: number;
    elementTimeout: number;
    test: number;
  };
  logLevel: string;
  retries: number;
  workers: number;
  fullyParallel: boolean;
  screenshot: "on" | "off" | "only-on-failure";
  trace: "on" | "off" | "retain-on-failure";
}

const environments: Record<string, EnvironmentConfig> = {
  dev: {
    name: "dev",
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/",
    timeout: {
      navigation: 70000,
      actionTimeout: 50000,
      elementTimeout: 50000,
      test: 80000,
    },
    logLevel: "info",
    retries: 0,
    workers: 1,
    fullyParallel: false,
    screenshot: "on",
    trace: "on",
  },
};

export function getEnvironmentConfig(): EnvironmentConfig {
  const env = process.env.TEST_ENV || "dev";
  const config = environments[env];
  if (!config) {
    throw new Error(
      `Provided test_env: "${env}" is not valid, allowed values are "${Object.keys(environments).join(" , ")}"`,
    );
  }
  return config;
}
