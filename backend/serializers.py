from app import ma


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'coins', 'first_name', 'last_name', 'successful_returns',
                  'num_current_contracts_consumer', 'num_current_contracts_provider',
                  'complaints', 'level')
        include_fk = True


user_schema = UserSchema()
users_schema = UserSchema(many=True)
