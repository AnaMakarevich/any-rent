import threading
from uuid import uuid4
import queue
from pyledger.client.ws import WebSocketClientFactory
from pyledger.client.repl import call
from pyledger.client.lib import handle_response
from autobahn.asyncio.websocket import WebSocketClientProtocol
import asyncio


class MyClientProtocol(WebSocketClientProtocol):
    topics = []
    _stop = threading.Event()
    _requests = queue.Queue()
    _responses = queue.Queue()

    @staticmethod
    def call(contract, method, **kwargs):
        args = []
        for k, v in kwargs.items():
            args.append(k)
            args.append(v)

        MyClientProtocol._requests.put_nowait((contract, method) + tuple(args))
        try:
            response = MyClientProtocol._responses.get(timeout=1)
        except queue.Empty:
            response = None
        return response

    def stop(self):
        self._stop.set()

    def onConnect(self, response):
        print("Connected to server: {0}".format(response.peer))

    async def onOpen(self):
        print("Thread loop running")
        while not self._stop.is_set():
            try:
                args = self._requests.get_nowait()
                success, message = call(*args)
                if success:
                    # Create topic for subscription.
                    if message.startswith(36*b'0'):
                        topic = message[:36]
                        message = message[36:]
                    else:
                        topic = str(uuid4()).encode()
                        self.topics.append(topic)
                    self.sendMessage(topic + message, isBinary=True)
                else:
                    print(message)

            except queue.Empty:
                await asyncio.sleep(0.1)

    def onMessage(self, payload, isBinary):
        topic = payload[:36]
        payload = payload[36:]

        # 36 zero-bytes means broadcast
        if topic in self.topics or topic == 36*b'0':
            if topic != 36*b'0':
                self.topics.remove(topic)
            success, response = handle_response(payload)
            print(response)
            self._responses.put_nowait(response)
        else:
            print(topic)
            self._responses.put_nowait('')

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {}; {}".format(code, reason))


def run():
    address = '127.0.0.1'
    port = '9000'
    factory = WebSocketClientFactory('ws://{}:{}'.format(address, port))
    factory.protocol = MyClientProtocol

    loop = asyncio.get_event_loop()
    coro = loop.create_connection(factory, address, int(port))
    loop.run_until_complete(coro)

    try:
        loop.run_forever()
    except KeyboardInterrupt:
        loop.shutdown_asyncgens()
        loop.close()
        print('Bye')
