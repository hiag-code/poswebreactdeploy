from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db.database import get_db
from models.edital_model import Edital
from schemas.edital_schema import EditalCreate, EditalResponse
from core.security import require_admin

router = APIRouter(prefix="/editais", tags=["Editais"])


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
