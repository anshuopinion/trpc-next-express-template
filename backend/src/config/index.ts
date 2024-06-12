import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT as string;

interface IConfig {
  port: number;
  isProduction: boolean;
  isDevelopment: boolean;
  isTestEnvironment: boolean;
}

export const initConfig = (): IConfig => {
  const { NODE_ENV, PORT } = process.env;
  switch (NODE_ENV) {
    case "development":
      return {
        isProduction: false,
        isDevelopment: true,
        isTestEnvironment: false,
        port: Number(PORT) || 3001,
      };
    case "production":
      return {
        isProduction: true,
        isDevelopment: false,
        isTestEnvironment: false,
        port: Number(PORT) || 3001,
      };
    case "test":
      return {
        isProduction: false,
        isDevelopment: false,
        isTestEnvironment: true,
        port: Number(PORT) || 4000,
      };
    default:
      return {
        isProduction: false,
        isDevelopment: true,
        isTestEnvironment: false,
        port: Number(PORT) || 3001,
      };
  }
};

/**
 * gets the Mailgun API key and domain
 * @returns the Mailgun API key and domain
 */
export function getMailgunConfigs(): {
  apiKey: string;
  domain: string;
  mailListDomain: string;
} {
  const mailgunApiKey = process.env.MAILGUN_API_KEY!;
  if (!mailgunApiKey) {
    console.warn(
      "Environment variable MAILGUN_API_KEY needs to be set to establish Mailgun connection"
    );
  }

  const mailgunDomain = process.env.MAILGUN_DOMAIN!;
  if (!mailgunDomain) {
    console.warn(
      "Environment variable MAILGUN_DOMAIN needs to be set to establish Mailgun connection"
    );
  }

  const mailgunMailListDomain = process.env.MAILGUN_MAIL_LIST_DOMAIN!;
  if (!mailgunMailListDomain) {
    console.warn(
      "Environment variable MAILGUN_MAIL_LIST_DOMAIN needs to be set to establish Mailgun connection"
    );
  }

  return {
    apiKey: mailgunApiKey,
    domain: mailgunDomain,
    mailListDomain: mailgunMailListDomain,
  };
}

export const DATABASE_URL = process.env.DATABASE_URL as string;

export const config = initConfig();
