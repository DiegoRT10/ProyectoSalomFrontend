import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//import { config } from 'dotenv';

if (environment.production) {
  enableProdMode();
}

// Cargar las variables de entorno
//config();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
