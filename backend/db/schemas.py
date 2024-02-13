from pydantic import BaseModel
from typing import List

# these are PYDANTIC models
class UserBase(BaseModel):
    username: str
    email: str
    role_id: int

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
    role_id: int
    role_name: str
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

class DRS_SubscriptionBase(BaseModel):
    serial_number: str

class DRS_Subscription(DRS_SubscriptionBase):
    subscription_id: int
    customer_id: int
    type: str
    duration: str
    class Config:
        from_attributes = True

class DRS_SubmissionBase(BaseModel):
    # submission_id: int
    # customer_id: int
    # payment_id: int
    salesperson_name: str
    submission_email: str

class DRS_Submissions(DRS_SubmissionBase):
    class Config:
        from_attributes = True

class CustomerBase(BaseModel):
    # customer_id: int
    account_number: str
    first_name: str
    last_name: str
    business_name: str
    address1: str
    address2: str
    state: str
    city: str
    zip: str

class Customer(CustomerBase):
    class Config:
        from_attributes = True

class SubmissionCreate(BaseModel):
    customer: CustomerBase
    drs_submission: DRS_SubmissionBase

class Equipment_Model(BaseModel):
    EQ_Model_id: int
    EQ_Model_name: str
    EQ_Model_make_id: int
    EQ_Model_cat_id: int
    group_code: str
    hauling_chart: str
    class Config:
        from_attributes = True

class Equipment_Make(BaseModel):
    make_id: int
    make_name: str
    make_cat_id: int
    class Config:
        from_attributes = True

# from role_perms (connects role/perm_ids)
class Role_Perms(BaseModel):
    role_perm_id: int
    role_id: int
    perm_id: int
    class Config:
        from_attributes = True

# from permissions (perm information)
class Permission(BaseModel):
    perm_id: int
    name: str
    perm_key: str
    perm_desc: str
    class Config:
        from_attributes = True

# list of permissions
class Permissions(BaseModel):
    items: List[Permission]

# from roles (role information)
class Role(BaseModel):
    role_id: int
    role_name: int
    class Config:
        from_attributes = True

class TokenData(BaseModel):
    role_id: int
    permissions: List[str]
    permission_ids: List[int]