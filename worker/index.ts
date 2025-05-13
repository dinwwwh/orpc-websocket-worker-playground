import { experimental_RPCHandler as RPCHandler } from '@orpc/server/websocket'
import { router } from './router';

const handler = new RPCHandler(router)

export default {
  fetch(request) {
    console.log(request.headers)
    const upgradeHeader = request.headers.get('Upgrade');
    if (!upgradeHeader || upgradeHeader !== 'websocket') {
      return new Response('Expected Upgrade: websocket', { status: 426 });
    }

    const webSocketPair = new WebSocketPair();
    const client = webSocketPair[0],
      server = webSocketPair[1];

    server.accept();

    handler.upgrade(server)

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  },
} satisfies ExportedHandler<Env>;
