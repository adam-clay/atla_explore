from sqlalchemy.orm import Session

import db.models as models, db.schemas as schemas


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_role(db: Session, role_id: str):
    return db.query(models.User_Role).filter(models.User_Role.role_id == role_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 500):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_branches(db: Session, skip: int = 0, limit: int = 25):
    return db.query(models.Branch).offset(skip).limit(limit).all()

def get_branch_by_name(db: Session, name: str):
    return db.query(models.Branch).filter(models.Branch.name == name).first()

def get_drs_subs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.DRS_Subscription).offset(skip).limit(limit).all()

# def create_user(db: Session, user: schemas.UserCreate):
#     fake_hashed_password = user.password + "notreallyhashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
