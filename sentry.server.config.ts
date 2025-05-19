// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
	dsn: 'https://19b02e2236a6d4840a749c71d28cb7c2@o4508461901283328.ingest.de.sentry.io/4508461904101456',

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false
})
