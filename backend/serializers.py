from app import ma
from models import User, Item


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