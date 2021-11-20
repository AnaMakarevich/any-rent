from app import ma
from models import User, Item, Contract


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        fields = ('id', 'coins', 'first_name', 'last_name', 'successful_returns',
                  'num_current_contracts_consumer', 'num_current_contracts_provider',
                  'complaints', 'level')
        include_fk = False

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class ItemSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Item
        fields = ('id', 'date_added', 'name', 'description',
                  'owner_id', 'state', 'available_since', 'max_rent_length',
                  'kaution', 'coins', 'lat', 'lon', 'fragile', 'required_post_actions',
                  'checked_at_return', 'status', 'picture_before')
        include_fk = True

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)


class ContractSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Contract
        fields = ('id', 'provider_id', 'consumer_id', 'start_date',
                  'end_date', 'status', 'picture_after', 'closed_on',
                  'provider_confirmed_return', 'consumer_confirmed_return')
        include_fk = True

contract_schema = ContractSchema()
contracts_schema = ContractSchema(many=True)
