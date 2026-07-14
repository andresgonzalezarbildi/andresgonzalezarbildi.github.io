export default async function studySlashes(request) {
  const url = new URL(request.url);

  const paths = ["/so", "/arqui", "/plan"];

  if (paths.includes(url.pathname)) {
    url.pathname = `${url.pathname}/`;
    return Response.redirect(url, 302);
  }
}

export const config = {
  path: ["/so", "/arqui", "/plan"],
};
