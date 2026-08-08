const { proxyDriveFunction } = require('./_lib/estudio-drive-proxy');

exports.handler = async (event) => proxyDriveFunction(event, 'drive-session');
