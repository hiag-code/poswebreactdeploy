from datetime import date
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


#separado para utlização do CRUDbase
class AlunoBase(BaseModel):
    nome: str = Field(min_length=1)
    cpf: str = Field(min_length=11, max_length=14)
    email: str = Field(min_length=1)
    data_nascimento: date
 

class AlunoCreate(AlunoBase):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "nome": "Maria Souza",
            "cpf": "12345678901",
            "email": "maria@ifba.edu.br",
            "data_nascimento": "2002-05-14",
            "senha": "senha123",
        }
    })

    senha: str = Field(min_length=6)  # senha para o login do aluno (Usuario)


#para alteracao dos dados do aluno
class AlunoUpdate(BaseModel):
    nome: Optional[str] = None
    cpf: Optional[str] = None
    email: Optional[str] = None
    data_nascimento: Optional[date] = None
    senha: Optional[str] = None

# o que a API DEVOLVE (sem a senha!)
class AlunoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nome: str
    cpf: str
    email: str
    data_nascimento: date
    status: str

