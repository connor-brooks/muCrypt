#!/usr/bin/env python3
import asyncio
import websockets
import ssl

users = set()
sslContext = ssl.SSLContext(ssl.PROTOCOL_TLS)
cert = "/path/to/ssl/cert.pem"
privKey = "/path/to/privkey.pem"
sslContext.load_cert_chain(cert, privKey)

async def addUser(websocket):
    users.add(websocket)
    await broadcast("Somebody has joined the chat.")

async def removeUser(websocket):
    users.remove(websocket)
    await broadcast("Somebody has left the chat.")

async def broadcast(message):
    print(message)
    for user in users:
        await user.send(message)

async def test(websocket, path):
    await addUser(websocket)
    while True:
        try:
            message = await websocket.recv()
            await broadcast(message)
        except:
            await removeUser(websocket)
            websocket.close()
            break

startServer = websockets.serve(
            test, "0.0.0.0", 8765, ssl=sslContext
            )

asyncio.get_event_loop().run_until_complete(startServer)
asyncio.get_event_loop().run_forever()
