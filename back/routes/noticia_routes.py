from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from models.noticia_model import Noticia
from schemas.noticia_schema import NoticiaCreate, NoticiaResponse, NoticiaUpdate
from core.security import require_admin
from crud import CRUDBase

router = APIRouter(prefix="/noticias", tags=["Notícias"])
noticia_crud = CRUDBase(Noticia)


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

@router.get("/{id}", response_model=NoticiaResponse)
def buscar_noticia(id: int, db: Session = Depends(get_db)):
    noticia = noticia_crud.get_by_id(db, id=id)
    if not noticia:
        raise HTTPException(status_code=404, detail="Notícia não encontrada.")
    return noticia

@router.put("/{id}", response_model=NoticiaResponse)
def atualizar_noticia(id: int, dados: NoticiaUpdate, db: Session = Depends(get_db), admin = Depends(require_admin)):
    noticia = noticia_crud.update(db, id=id, obj_in=dados.model_dump(exclude_unset=True))
    if not noticia:
        raise HTTPException(status_code=404, detail="Notícia não encontrada.")
    return noticia

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_noticia(id: int, db: Session = Depends(get_db), admin = Depends(require_admin)):
    if not noticia_crud.delete(db, id=id):
        raise HTTPException(status_code=404, detail="Notícia não encontrada.")
    return None