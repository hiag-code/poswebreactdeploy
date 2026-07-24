from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

# o que o cliente ENVIA para criar uma turma
class TurmaCreate(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "disciplina_id": 1,
            "docente_id": 1,
            "semestre": "2026.1",
            "vagas_total": 40,
            "codigo": "BD101-T1",
        }
    })

    disciplina_id: int = Field(ge=1)
    docente_id: int = Field(ge=1)
    semestre: str = Field(min_length=1, max_length=15)
    vagas_total: int = Field(ge=1)
    codigo: str = Field(min_length=1, max_length=10)

class TurmaUpdate(BaseModel):
    disciplina_id: Optional[int] = Field(ge=1, default=None)
    docente_id: Optional[int] = Field(ge=1, default=None)
    semestre: Optional[str] = Field(min_length=1, max_length=15, default=None)
    vagas_total: Optional[int] = Field(ge=1, default=None)
    codigo: Optional[str] = Field(min_length=1, max_length=10, default=None)

# o que a API DEVOLVE
class TurmaResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    disciplina_id: int
    docente_id: int
    semestre: str
    vagas_total: int
    vagas_disponiveis: int
    codigo: str
