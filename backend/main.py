from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

# database stuff
import db.crud as crud, db.models as models, db.schemas as schemas
from db.database import SessionLocal, engine

# middleware stuff
from fastapi.middleware.cors import CORSMiddleware

# OAuth stuff
from fastapi.security import OAuth2PasswordBearer
import requests
from jose import jwt

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return "Dashboard"


# user stuff
@app.get("/users/", response_model=list[schemas.Users])
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


# more Oauth stuff
GOOGLE_CLIENT_ID = '265183174882-6ivp0go7ch17tuf8lk0qiapvlv1u6l4e.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = "'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'"
GOOGLE_REDIRECT_URI = "/"

@app.get("/login/google")
async def login_google():
    return {
        "url": f"https://accounts.google.com/o/oauth2/auth?response_type=code&client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=openid%20profile%20email&access_type=offline"
    }

@app.get("/auth/google")
async def auth_google(code: str):
    token_url = "https://accounts.google.com/o/oauth2/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    response = requests.post(token_url, data=data)
    access_token = response.json().get("access_token")
    user_info = requests.get("https://www.googleapis.com/oauth2/v1/userinfo", headers={"Authorization": f"Bearer {access_token}"})
    return user_info.json()

@app.get("/token")
async def get_token(token: str = Depends(oauth2_scheme)):
    return jwt.decode(token, GOOGLE_CLIENT_SECRET, algorithms=["HS256"])
