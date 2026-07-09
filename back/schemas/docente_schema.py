from pydantic import BaseModel, ConfigDict, Field


# o que o cliente ENVIA pra criar um docente
class DocenteCreate(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "nome": "Prof. Carlos Lima",
            "cpf": "98765432100",
            "titulacao": "Doutor",
            "email": "carlos@ifba.edu.br",
            "senha": "senha123",
        }
    })

    nome: str = Field(min_length=1)
    cpf: str = Field(min_length=11, max_length=14)
    titulacao: str = Field(min_length=1)
    email: str = Field(min_length=1)
    senha: str = Field(min_length=4)


# o que a API DEVOLVE (sem a senha!)
class DocenteResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nome: str
    cpf: str
    titulacao: str | None
    email: str
    status: str
