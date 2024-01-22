from pydantic import BaseModel

# these are PYDANTIC models
class UserBase(BaseModel):
    username: str
    email: str
    role_id: str

# I don't think this will be used (new users added manually)
# might delete later
# class UserCreate(UserBase):
#     password: str


class Users(UserBase):
    id: int
    # status: bool
    role_id: int
    #role_name:str
    class Config:
        from_attributes = True

class User(UserBase):
    id: int
    # status: bool
    role_id: int
    role_name:str
    class Config:
        from_attributes = True

class RoleBase(BaseModel):
    role_id: int
    role_name: str

class Role(RoleBase):
    in_list: bool
    # status: bool
    role_name: str
    role_id: int
    class Config:
        from_attributes = True

class BranchBase(BaseModel):
    name:str

class Branch(BranchBase):
    id:int
    cdkg_id:int
    status: bool
    class Config:
        from_attributes = True

class DRS_SubBase(BaseModel):
    serial_number: str

class DRS_Subscription(DRS_SubBase):
    subscription_id: int
    customer_id: int
    type: str
    duration: str
    class Config:
        from_attributes = True