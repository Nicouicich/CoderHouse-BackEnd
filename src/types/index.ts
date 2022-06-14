import session from "express-session";

export = session;

declare module "express-session" {
  interface SessionData {
    info: {
        loggedIn: boolean,
        contador: number,
        username: string,
        admin: boolean,
    }
  }
}