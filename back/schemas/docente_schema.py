from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


# o que o cliente ENVIA pra criar um docente

class DocenteBase(BaseModel):
    nome: str = Field(min_length=1)
    cpf: str = Field(min_length=11, max_length=14)
    titulacao: str = Field(min_length=1)
    email: str = Field(min_length=1)

class DocenteCreate(DocenteBase):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "nome": "Prof. Carlos Lima",
            "cpf": "98765432100",
            "titulacao": "Doutor",
            "email": "carlos@ifba.edu.br",
            "senha": "senha123",
        }
    })

    senha: str = Field(min_length=4)

class DocenteUpdate(BaseModel):
    nome: Optional[str] =  Field(min_length=1, default=None)
    cpf: Optional[str] = Field(min_length=11, max_length=14, default=None)
    titulacao: Optional[str] = Field(min_length=1, default=None)
    email: Optional[str] = Field(min_length=1, default=None)


# o que a API DEVOLVE (sem a senha!)
class DocenteResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nome: str
    cpf: str
    titulacao: str | None
    email: str
    status: str
