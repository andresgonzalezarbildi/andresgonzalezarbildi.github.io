Proxy de Google Drive para /plan
================================

El cronograma se sirve visualmente desde:
  https://estudiofing.netlify.app/plan/

pero también se accede mediante:
  https://andresgonzalez.netlify.app/plan/

El JavaScript del cronograma llama a /.netlify/functions/drive-*. Estas funciones
locales NO guardan secretos: reenvían las peticiones a las funciones reales de
EstudioFing y devuelven la cookie de sesión al dominio andresgonzalez.netlify.app.

Las variables GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET y SESSION_SECRET siguen
configuradas únicamente en el proyecto Netlify de estudiofing.netlify.app.

Para que el login funcione desde andresgonzalez.netlify.app, ese origen debe
estar autorizado en el cliente OAuth de Google.
