from pydantic import BaseModel, ConfigDict


class LoginRequest(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {"email": "admin@ifba.edu.br", "senha": "admin123"}
    })

    email: str
    senha: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
