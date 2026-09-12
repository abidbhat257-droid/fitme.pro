from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'fitme')
client = AsyncIOMotorClient(mongo_url) if mongo_url else None
db = client[db_name] if client else None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


def get_db():
    if db is None:
        raise RuntimeError('MongoDB is not configured. Set MONGO_URL and DB_NAME.')
    return db


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class UserProfile(BaseModel):
    model_config = ConfigDict(extra="ignore")

    user_id: str
    measurements: dict = Field(default_factory=dict)
    goals: list = Field(default_factory=list)
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class UserProfileCreate(BaseModel):
    user_id: str
    measurements: dict = Field(default_factory=dict)
    goals: list = Field(default_factory=list)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await get_db().status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await get_db().status_checks.find({}, {"_id": 0}).to_list(1000)

    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks


@api_router.get("/profile/{user_id}", response_model=UserProfile | None)
async def get_profile(user_id: str):
    doc = await get_db().profiles.find_one({"user_id": user_id}, {"_id": 0})
    if doc is None:
        return None
    if isinstance(doc.get('updated_at'), str):
        doc['updated_at'] = datetime.fromisoformat(doc['updated_at'])
    return UserProfile(**doc)


@api_router.post("/profile", response_model=UserProfile)
async def save_profile(input: UserProfileCreate):
    profile = UserProfile(
        user_id=input.user_id,
        measurements=input.measurements,
        goals=input.goals,
    )
    payload = profile.model_dump(mode='python')
    updated_at = payload['updated_at']
    payload['updated_at'] = updated_at.isoformat() if hasattr(updated_at, 'isoformat') else str(updated_at)
    await get_db().profiles.update_one(
        {"user_id": profile.user_id},
        {"$set": payload},
        upsert=True,
    )
    return profile

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()