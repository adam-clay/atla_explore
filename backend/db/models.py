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

class User_Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True)
    role_name = Column(String)
    in_list = Column(Boolean)
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