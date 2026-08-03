from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from db.database import get_db
from models.disciplina_model import Disciplina
from schemas.disciplina_schema import DisciplinaCreate, DisciplinaResponse, DisciplinaUpdate
from core.security import require_admin
from crud import CRUDBase

router = APIRouter(prefix="/disciplinas", tags=["Disciplinas"])
disciplina_crud = CRUDBase(Disciplina)


@router.post(
    "/",
    response_model=DisciplinaResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar disciplina",
)
def criar_disciplina(
    dados: DisciplinaCreate,
    db: Session = Depends(get_db),
    usuario: dict = Depends(require_admin),
):
    """Cria uma disciplina no sistema. **Restrito a admin.** Recusa código já existente (409)."""

    # salva e devolve 201 (com o id gerado)
    disciplina = Disciplina(**dados.model_dump())
    db.add(disciplina)
    db.commit()
    db.refresh(disciplina)
    return disciplina

#buscar discipllina por id
@router.get("/{id}", response_model=DisciplinaResponse, summary="busca de disciplina")
def buscar_disciplina(id: int, db: Session = Depends(get_db)):
    disciplina = disciplina_crud.get_by_id(db, id=id)
    if not disciplina:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Disciplina não encontrada"
        )
    return disciplina

@router.put("/{id}", response_model=DisciplinaResponse, summary="atualizar dados")
def atualizar_Disciplina(id: int, dados: DisciplinaUpdate, db : Session = Depends(get_db), admin_user : dict = Depends(require_admin)):
    disciplina_atualizada = disciplina_crud.update(db, id=id, obj_in=dados.model_dump(exclude_unset=True))

    if not disciplina_atualizada:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Disciplina não encontrada"
        )
    
    return disciplina_atualizada

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_Discipilina(id : int, db : Session = Depends(get_db), admin_user : dict = Depends(require_admin)):
    sucesso = disciplina_crud.delete(db, id=id)

    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Disciplina não encontrada"
        )

    return None
