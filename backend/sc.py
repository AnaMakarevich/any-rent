from pyledger.server.contract import SimpleContract

class AnyRent(SimpleContract):
    users = {}
    items = {}
    contracts = {}

    def add_user(self, user: dict):
        uid = user['id']
        if uid in self.users:
            raise Exception('User already exists')

        self.users[uid] = user
        return uid

    def add_item(self, item: dict):
        iid = item['id']
        if iid in self.items:
            raise Exception('Item already exists')

        self.items[iid] = item
        return iid

    def add_contract(self, c: dict):
        cid = c['id']
        if cid in self.contracts:
            raise Exception('Contract already exists')

        self.contracts[cid] = c
        return cid

    def get_user(self, uid: int):
        if uid not in self.accounts:
            raise Exception('User not found')

        return self.users[uid]

    def get_item(self, iid: int):
        if iid not in self.items:
            raise Exception('Item not found')

        return self.items[iid]

    def get_contract(self, cid: int):
        if cid not in self.contracts:
            raise Exception('Contract not found')

        return self.contracts[cid]

    def get_contracts(self):
        return self.contracts


if __name__ == '__main__':
    from pyledger.server import run
    run(AnyRent)
