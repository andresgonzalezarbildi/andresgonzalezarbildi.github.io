const UPSTREAM_ORIGIN = 'https://estudiofing.netlify.app';
const ALLOWED_FUNCTIONS = new Set([
  'drive-config',
  'drive-auth',
  'drive-session',
  'drive-sync',
  'drive-logout',
]);

function response(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      ...headers,
    },
    body,
  };
}

function requestOrigin(event) {
  return String(
    event.headers?.origin ||
    event.headers?.Origin ||
    ''
  ).trim();
}

async function proxyDriveFunction(event, functionName) {
  if (!ALLOWED_FUNCTIONS.has(functionName)) {
    return response(
      404,
      JSON.stringify({ error: 'Función no permitida' }),
      { 'Content-Type': 'application/json; charset=utf-8' }
    );
  }

  const upstreamUrl = `${UPSTREAM_ORIGIN}/.netlify/functions/${functionName}`;
  const headers = {};

  const contentType = event.headers?.['content-type'] || event.headers?.['Content-Type'];
  if (contentType) headers['Content-Type'] = contentType;

  const requestedWith = event.headers?.['x-requested-with'] || event.headers?.['X-Requested-With'];
  if (requestedWith) headers['X-Requested-With'] = requestedWith;

  const cookie = event.headers?.cookie || event.headers?.Cookie;
  if (cookie) headers.Cookie = cookie;

  // La función real valida que redirectUri y Origin coincidan.
  // Conservamos el origen público (andresgonzalez.netlify.app), no el de EstudioFing.
  const origin = requestOrigin(event);
  if (origin) headers.Origin = origin;

  try {
    const upstream = await fetch(upstreamUrl, {
      method: event.httpMethod,
      headers,
      body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : (event.body || undefined),
      redirect: 'manual',
    });

    const body = await upstream.text();
    const outHeaders = {
      'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
    };

    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) outHeaders['Set-Cookie'] = setCookie;

    return response(upstream.status, body, outHeaders);
  } catch (error) {
    console.error(`Proxy ${functionName}:`, error);
    return response(
      502,
      JSON.stringify({
        error: 'No se pudo comunicar con las funciones de EstudioFing',
      }),
      { 'Content-Type': 'application/json; charset=utf-8' }
    );
  }
}

module.exports = { proxyDriveFunction };
