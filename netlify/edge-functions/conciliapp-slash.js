export default async function conciliappSlash(request) {
  const url = new URL(request.url);

  if (url.pathname === "/conciliapp") {
    url.pathname = "/conciliapp/";
    return Response.redirect(url, 302);
  }
}

export const config = {
  path: "/conciliapp",
};
