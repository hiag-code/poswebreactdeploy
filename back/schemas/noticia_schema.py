from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


# o que o cliente ENVIA pra criar (sem id — o banco gera)
class NoticiaCreate(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "titulo": "Inscrições abertas para o semestre 2026.2",
            "descricao": "A secretaria informa que as inscrições seguem até o fim do mês.",
            "link": "https://portal.ifba.edu.br/noticias/inscricoes-2026-2",
            "imagem_url": "https://cdn.exemplo.com/noticias/inscricoes.jpg",
        }
    })

    titulo: str = Field(min_length=2)
    descricao: str = Field(min_length=2)
    link: str = Field(min_length=4)
    imagem_url: HttpUrl | None = None   # opcional — pode vir vazio


class NoticiaUpdate(BaseModel):
    titulo: Optional[str] = Field(min_length=2, default=None)
    descricao: Optional[str] = Field(min_length=2, default=None)
    link: Optional[str] = Field(min_length=4, default=None)
    imagem_url: Optional[str] = Field(default=None)

# o que a API DEVOLVE (com o id gerado)
class NoticiaResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    titulo: str
    descricao: str
    link: str
    imagem_url: str | None = None
