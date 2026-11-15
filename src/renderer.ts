import type { CloverApi } from '@clovernt/sdk';

import { PING_CHANNEL, PLUGIN_NAME } from './shared';

declare const clovernt: Required<Pick<CloverApi, 'log' | 'invoke' | 'send' | 'on'>>;

const log = clovernt.log(PLUGIN_NAME);

clovernt.invoke(PING_CHANNEL).then((reply) => {
    log.info(`${PING_CHANNEL} -> ${String(reply)}`);
});
