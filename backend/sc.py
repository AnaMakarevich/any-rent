from pyledger.server.contract import SimpleContract

class DigitalCurrency(SimpleContract):
    accounts = {}

    def add_account(self, key: str):
        if key in self.accounts:
            raise Exception('Account already exists')

        self.accounts[key] = 0.0
        return key

    def increment(self, key: str, quantity: float):
        if key not in self.accounts:
            raise Exception('Account not found')

        self.accounts[key] += quantity

    def transfer(self, source: str, dest: str, quantity: float):
        if source not in self.accounts:
            raise Exception('Source account not found')
        if dest not in self.accounts:
            raise Exception('Destination account not found')
        if self.accounts[source] < quantity:
            raise Exception('Not enough funds in source account')
        if quantity < 0:
            raise Exception('You cannot transfer negative currency')

        self.accounts[source] -= quantity
        self.accounts[dest] += quantity

    def balance(self, key: str):
        if key not in self.accounts:
            print(self.accounts)
            raise Exception('Account not found')

        return str(self.accounts[key])


if __name__ == '__main__':
    from pyledger.server import run
    run(DigitalCurrency)
