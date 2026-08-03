from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

# o que o cliente ENVIA pra criar (sem id — o banco gera)
class EditalCreate(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "titulo": "Edital 03/2026 — Seleção de bolsistas",
            "descricao": "Abertura de vagas para bolsa de iniciação. Requisitos no documento.",
            "link": "https://portal.ifba.edu.br/editais/03-2026.pdf",
        }
    })

    titulo: str = Field(min_length=2)
    descricao: str = Field(min_length=2)
    link: str = Field(min_length=4)

class EditalUpdate(BaseModel):
    titulo: Optional[str] = Field(min_length=2, default=None)
    descricao: Optional[str] = Field(min_length=2, default=None)
    link: Optional[str] = Field(min_length=4, default=None)
    

# o que a API DEVOLVE (com o id gerado)
class EditalResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    titulo: str
    descricao: str
    link: str
