// CloverCore loads this file with `require`, and accepts both `export default` (standard CJS/ESM
// interop) and a named `onLoad` export. `definePlugin` is an identity helper: it exists so that
// TypeScript infers `ctx` and checks the hook names. The hooks are called synchronously.

import { definePlugin } from '@clovernt/sdk';

import { PING_CHANNEL } from './shared';

export default definePlugin({
    onLoad(ctx) {
        const log = ctx.logger;
        log.info(`${ctx.name} loaded (CloverCore ${ctx.version})`);

        // These handlers are automatically removed when the plugin is unloaded, so you don't need to write cleanup code.
        ctx.ipcMain.handle(PING_CHANNEL, () => 'pong');

        // Subscribe to the 'dll-load' event to log when a .node addon is loaded
        ctx.events.on('dll-load', (dll) => {
            if (dll.baseName.endsWith('.node')) {
                log.info(`node addon loaded: ${dll.baseName}`);
            }
        });
    },
    // If you need some cleanup:
    // onUnload() {
        // ...
    // },
});
