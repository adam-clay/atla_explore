from sqlalchemy.orm import Session

import db.models as models, db.schemas as schemas

from fastapi.exceptions import HTTPException


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_role(db: Session, role_id: str):
    return db.query(models.Role).filter(models.Role.role_id == role_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 500):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_branches(db: Session, skip: int = 0, limit: int = 25):
    return db.query(models.Branch).offset(skip).limit(limit).all()

def get_branch_by_name(db: Session, name: str):
    return db.query(models.Branch).filter(models.Branch.name == name).first()

def get_drs_subs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.DRS_Subscription).offset(skip).limit(limit).all()

def create_customer(db: Session, customer_data: schemas.Customer):
    db_customer = models.Customer(**customer_data)
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

def create_drs_submission(db: Session, submission_data: schemas.DRS_Submissions):
    db_drs_submission = models.DRS_Submission(**submission_data)
    db.add(db_drs_submission)
    db.commit()
    db.refresh(db_drs_submission)
    return db_drs_submission
#
# makes and models stuff
#
def get_models(db: Session, skip: int = 0, limit: int = 4000):
    return db.query(models.Equipment_Model).offset(skip).limit(limit).all()

def get_makes(db: Session, skip: int = 0, limit: int = 30):
    return db.query(models.Equipment_Make).offset(skip).limit(limit).all()

def get_makes_by_category(db: Session, category_id: int):
    return db.query(models.Equipment_Make).filter(models.Equipment_Make.make_cat_id == category_id).all()

def get_models_by_make(db: Session, make_id: int):
    return db.query(models.Equipment_Model).filter(models.Equipment_Model.EQ_Model_make_id == make_id).all()

#
# permissions stuff
# 
def get_permIDs_by_roleID(db: Session, role_id: int):
    return db.query(models.Role_Perms).filter(models.Role_Perms.role_id == role_id).all()

# list of perms from permID
def get_perm_by_permID(db: Session, perm_id: int):
    permissions = db.query(models.Permissions).filter(models.Permissions.perm_id == perm_id).first()
    
    if permissions is None:
        raise HTTPException(status_code=404, detail="Permission not found")
    
    return permissions

# def create_user(db: Session, user: schemas.UserCreate):
#     fake_hashed_password = user.password + "notreallyhashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
