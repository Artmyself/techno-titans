from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ua_validator.core import validate_ua_email

app = FastAPI(title='UA Contact System')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class ContactRequest(BaseModel):
    email: str


@app.get('/health')
def health():
    return {'ok': True}


@app.post('/api/contact')
def contact(request: ContactRequest):
    return validate_ua_email(request.email)