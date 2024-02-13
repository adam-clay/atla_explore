from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from db.database import Base

# these are SQLALCHEMY models
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    email = Column(String, unique=True, index=True)
    role_id = Column(Integer)
    is_google = Column(Boolean, default=True)
    google_token = Column(String)
    google_update_time = Column(String)
    status = Column(Boolean)

class Branch(Base):
    __tablename__ = 'branches'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    cdkg_id = Column(Integer)
    slug = Column(String)
    status = Column(Boolean)

class DRS_Subscription(Base):
    __tablename__ = 'drs_subscriptions'

    subscription_id = Column(Integer, primary_key = True)
    customer_id = Column(Integer)
    type = Column(String)
    serial_number = Column(String)
    duration = Column(String)
    challenge_code = Column(String)
    created_at = Column(String)
    last_updated_at = Column(String)

class DRS_Submission(Base):
    __tablename__ = 'drs_submissions'

    submission_id = Column(Integer, primary_key = True, autoincrement=True)
    customer_id = Column(Integer, autoincrement=True)
    payment_id = Column(Integer, autoincrement=True)
    salesperson_name = Column(String)
    submission_email = Column(String)
    # status = Column(Boolean)
    # comments = Column(String)
    # created_at = Column(String)
    # last_updated_at = Column(String)

class Customer(Base):
    __tablename__ = 'customers'

    customer_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    account_number = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    business_name = Column(String)
    address1 = Column(String)
    address2 = Column(String)
    city = Column(String)
    state = Column(String)
    zip = Column(String)
    # created_at = Column(String)
    # last_updated_at = Column(String)

class Equipment_Model(Base):
    __tablename__ = 'eq_models'

    EQ_Model_id = Column(Integer, primary_key=True)
    EQ_Model_name = Column(String)
    EQ_Model_make_id = Column(Integer)
    EQ_Model_cat_id = Column(Integer)
    group_code = Column(String)
    hauling_chart = Column(String)

class Equipment_Make(Base):
    __tablename__ = 'eq_makes'

    make_id = Column(Integer, primary_key=True)
    make_name = Column(String)
    make_cat_id = Column(Integer)

class Role_Perms(Base):
    __tablename__ = 'role_perm'

    role_perm_id = Column(Integer, primary_key=True)
    role_id = Column(Integer)
    perm_id = Column(Integer)

class Permissions(Base):
    __tablename__ = 'permissions'

    perm_id = Column(Integer, primary_key=True)
    name = Column(String)
    perm_key = Column(String)
    perm_desc = Column(String)

class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True)
    role_name = Column(String)


