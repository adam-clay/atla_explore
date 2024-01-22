from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import pymysql

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://servatla:J3uxfQJo8tnch@apps.atlantictractor.net/servatla_atwebapps"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
