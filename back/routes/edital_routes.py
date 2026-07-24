from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from models.edital_model import Edital
from schemas.edital_schema import EditalCreate, EditalResponse, EditalUpdate
from core.security import require_admin
from crud import CRUDBase

router = APIRouter(prefix="/editais", tags=["Editais"])
edital_crud = CRUDBase(Edital)

@router.post(
    "/",
    response_model=EditalResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar edital",
)
def criar_edital(
    dados: EditalCreate,
    db: Session = Depends(get_db),
    usuario: dict = Depends(require_admin),
):
    """Cria um edital no portal. **Restrito a admin** (secretaria)."""
    edital = Edital(**dados.model_dump())
    db.add(edital)
    db.commit()
    db.refresh(edital)
    return edital


@router.get("/", response_model=list[EditalResponse], summary="Listar editais")
def listar_editais(db: Session = Depends(get_db)):
    """Lista os editais cadastrados (mais recentes primeiro). Acesso público."""
    return db.query(Edital).order_by(Edital.id.desc()).all()

@router.get("/{id}", response_model=EditalResponse)
def buscar_edital(id: int, db: Session = Depends(get_db)):
    edital = edital_crud.get_by_id(db, id=id)
    if not edital:
        raise HTTPException(status_code=404, detail="Edital não encontrado.")
    return edital

@router.put("/{id}", response_model=EditalResponse)
def atualizar_edital(id: int, dados: EditalUpdate, db: Session = Depends(get_db), admin = Depends(require_admin)):
    edital = edital_crud.update(db, id=id, obj_in=dados.model_dump(exclude_unset=True))
    if not edital:
        raise HTTPException(status_code=404, detail="Edital não encontrado.")
    return edital

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_edital(id: int, db: Session = Depends(get_db), admin = Depends(require_admin)):
    if not edital_crud.delete(db, id=id):
        raise HTTPException(status_code=404, detail="Edital não encontrado.")
    return None