import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    // process.env.SECRET_COOKIE_PASSWORD ||
    password: "PDL3sjREVRXPr82gyZ3GDw3LHZQKDhPm",
    cookieName: "nexomthebestecommercesiteonuniversecheckitoutwhereuhvbeen",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      //process.env.NODE_ENV === "production" ? true :
      secure: false,
    },
  });
}
