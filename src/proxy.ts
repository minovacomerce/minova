import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match every pathname EXCEPT the ones we want to skip
    "/((?!api|_next|_vercel|brand|videos|data|fonts|.*\\..*).*)",
  ],
};
