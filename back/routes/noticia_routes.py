from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db.database import get_db
from models.noticia_model import Noticia
from schemas.noticia_schema import NoticiaCreate, NoticiaResponse
from core.security import require_admin

router = APIRouter(prefix="/noticias", tags=["Notícias"])


@router.post(
    "/",
    response_model=NoticiaResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar notícia",
)
def criar_noticia(
    dados: NoticiaCreate,
    db: Session = Depends(get_db),
    usuario: dict = Depends(require_admin),
):
    """Cria uma notícia no portal. **Restrito a admin** (secretaria).

    `imagem_url` é opcional e guarda apenas a URL pública da imagem (o upload em si é feito fora, ex: S3/Firebase).
    """
    noticia = Noticia(**dados.model_dump())
    db.add(noticia)
    db.commit()
    db.refresh(noticia)
    return noticia


@router.get("/", response_model=list[NoticiaResponse], summary="Listar notícias")
def listar_noticias(db: Session = Depends(get_db)):
    """Lista as notícias cadastradas (mais recentes primeiro). Acesso público."""
    return db.query(Noticia).order_by(Noticia.id.desc()).all()
