
import { createORPCClient } from '@orpc/client'
import { router } from '../../worker/router'
import { experimental_RPCLink as RPCLink } from '@orpc/client/websocket'
import type { RouterClient } from '@orpc/server'

const websocket = new WebSocket('ws://' + window.location.host + '/rpc')

const link = new RPCLink({
    websocket
})

export const client: RouterClient<typeof router> = createORPCClient(link)