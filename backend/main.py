from fastapi import Depends, FastAPI, HTTPException, Request, status
from sqlalchemy.orm import Session
from typing import List, Optional

# database stuff
import db.crud as crud, db.models as models, db.schemas as schemas
from db.database import SessionLocal, engine

# middleware stuff
from fastapi.middleware.cors import CORSMiddleware

# OAuth stuff
from fastapi.security import OAuth2PasswordBearer, OAuth2AuthorizationCodeBearer
import requests
from jose import jwt, JWTError
import httpx
from authlib.integrations.starlette_client import OAuth

# env stuff
from dotenv import load_dotenv
import os

models.Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()
oauth = OAuth()

# Set up oauth
load_dotenv()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
GOOGLE_REDIRECT_URI = "http://localhost:8000/auth/callback"

oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri=GOOGLE_REDIRECT_URI,
    client_kwargs={'scope': 'openid profile email'},
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ["*"] Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"], # Allows all headers 
)

@app.get("/")
async def root():
    return "Dashboard"

# user stuff
@app.get("/users", response_model=list[schemas.Users])
def read_users(skip: int = 0, limit: int = 500, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{username}", response_model=schemas.User)
def read_user_by_username(username: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user_role = crud.get_user_role(db, role_id = db_user.role_id)
    # print("User Role:", db_user_role.role_name)
    if db_user_role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return {"username": db_user.username, 
            "email": db_user.email, 
            "role_name": db_user_role.role_name,
            "role_id": db_user.role_id,
            "id": db_user.id}


# branch stuff
@app.get("/branches", response_model=list[schemas.Branch])
def read_branches(skip: int = 0, limit: int = 25, db: Session = Depends(get_db)):
    branches = crud.get_branches(db, skip = skip, limit=limit)
    return branches

@app.get("/branches/{name}", response_model=schemas.Branch)
def read_branch_by_name(name: str, db: Session = Depends(get_db)):
    db_branch = crud.get_branch_by_name(db, name=name)
    if db_branch is None:
        raise HTTPException(status_code=404, detail="Branch not found")
    return db_branch

# drs subscription stuff (all dummy right now)
@app.get("/drs_subscriptions", response_model= list[schemas.DRS_Subscription])
def read_drs_subs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    drs_subs = crud.get_drs_subs(db, skip=skip, limit=limit)
    return drs_subs

@app.post("/drs_submissions")
def create_submission(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    try:
        # Create customer entry
        db_customer = crud.create_customer(db, submission.customer.dict())

        # Create drs_submission entry
        drs_submission_data = submission.drs_submission
        # drs_submission_data['customer_id'] = db_customer.id

        db_drs_submission = crud.create_drs_submission(db, drs_submission_data.dict())
        return {"message": "Submission created successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    
# make/model stuff for service quoter
@app.get("/models", response_model=list[schemas.Equipment_Model])
def read_models(skip: int = 0, limit: int = 4000, db: Session = Depends(get_db)):
    models = crud.get_models(db, skip=skip, limit=limit)
    return models

@app.get("/makes", response_model=list[schemas.Equipment_Make])
def read_makes(skip: int = 0, limit: int = 30, db: Session = Depends(get_db)):
    makes = crud.get_makes(db, skip=skip, limit=limit)
    return makes

@app.get("/makes/{category_id}", response_model=list[schemas.Equipment_Make])
def read_makes_by_category(category_id: int, db: Session = Depends(get_db)):
    makes = crud.get_makes_by_category(db, category_id)
    return [{"make_name": make.make_name, "make_id": make.make_id, "make_cat_id": make.make_cat_id} for make in makes]

@app.get("/models/{make_id}", response_model=list[schemas.Equipment_Model])
def read_models_by_make(make_id: int, db: Session = Depends(get_db)):
    models = crud.get_models_by_make(db, make_id)
    return models

# not ready yet, I'm not sure about the response model
# @app.get("/packages", response_model=list[schemas.Package]) 

# permissions stuff 
@app.get("/perms/roles/{role_id}", response_model=list[schemas.Role_Perms])
def read_permID_by_roleID(role_id: int, db: Session = Depends(get_db)):
    perm_id = crud.get_permIDs_by_roleID(db, role_id)
    return perm_id

@app.get("/perms/{perm_id}", response_model=schemas.Permission)
def read_perms_by_permID(perm_id: int, db: Session = Depends(get_db)):
    perms = crud.get_perm_by_permID(db, perm_id)
    return perms

@app.get("/users/perms/{role_id}", response_model=List[schemas.Permission])
def read_perms_by_roleID(role_id: int, db: Session = Depends(get_db)):
    user_perm_ids = crud.get_permIDs_by_roleID(db, role_id)

    # Extract all perm_ids from the Role_Perms objects
    perm_ids = [role_perm.perm_id for role_perm in user_perm_ids]

    # Query the database once for all perm_ids
    user_perms = db.query(models.Permissions).filter(models.Permissions.perm_id.in_(perm_ids)).all()

    return user_perms

# get the current user's permissions from the token
def get_current_permissions(token: str = Depends(oauth2_scheme)) -> List[str]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, GOOGLE_CLIENT_SECRET, algorithms=["HS256"])
        permissions: Optional[List[str]] = payload.get("permissions")
        if permissions is None:
            raise credentials_exception
        token_data = schemas.TokenData(permissions=permissions)
    except JWTError:
        raise credentials_exception
    return token_data.permissions

# check if the current user has a certain permission
# fastAPI factory function
def has_permission(required_permission: str):
    # fastAPI dependency function
    def _has_permission(permissions: List[str] = Depends(get_current_permissions)) -> List[str]:
        if required_permission not in permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )
        return permissions
    return _has_permission

# get the current user's role_id from the token
def get_current_role_id(token: str = Depends(oauth2_scheme)) -> int:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, GOOGLE_CLIENT_SECRET, algorithms=["HS256"])
        role_id: Optional[int] = payload.get("role_id")
        if role_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(role_id=role_id)
    except JWTError:
        raise credentials_exception
    return token_data.role_id

@app.get("/users/perms/me", response_model=List[schemas.Permission])
def read_perms_by_roleID(db: Session = Depends(get_db), role_id: int = Depends(get_current_role_id)):
    user_perm_ids = crud.get_permIDs_by_roleID(db, role_id)

    # Extract all perm_ids from the Role_Perms objects
    perm_ids = [role_perm.perm_id for role_perm in user_perm_ids]

    # Query the database once for all perm_ids
    user_perms = db.query(models.Permissions).filter(models.Permissions.perm_id.in_(perm_ids)).all()


###
###
### BREAK FOR READABILITY
###
# more Oauth stuff

# authentication endpoint
@app.get("/auth/login")
async def login(request: Request):
    # Manually specify your redirect URI where Google will send the authorization code
    redirect_uri = "http://localhost:8000/auth/callback"
    
    # Redirect the client to Google's OAuth 2.0 server to initiate the authentication and authorization process
    return await oauth.google.authorize_redirect(request, redirect_uri)

# possibly the correct callback endpoint
@app.route('/auth')
async def auth(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user = await oauth.google.parse_id_token(request, token)
    # Here you would check the user's email or ID against your database
    # to assign permissions and create a session or token for them
    return {'email': user.get('email')}

# callback endpoint (I'm not sure if ../callback is necessary)
@app.get("/auth/callback")
async def auth_callback(request: Request):
    try:
        # Exchange the authorization code for tokens
        token = await oauth.google.authorize_access_token(request)
        
        # Optionally: Retrieve user information
        user_info = await oauth.google.parse_id_token(request, token)
        
        # At this point, you could create a user session or token in your application
        # and redirect the user to a logged-in page, for example:
        # return RedirectResponse(url='/some-logged-in-page')
        
        # For demonstration purposes, return the user information
        return user_info
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/token")
async def get_token(token: str = Depends(oauth2_scheme)):
    return jwt.decode(token, GOOGLE_CLIENT_SECRET, algorithms=["HS256"])
