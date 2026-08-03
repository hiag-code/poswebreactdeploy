from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from db.database import get_db
from models.turma_model import Turma
from models.disciplina_model import Disciplina
from models.docente_model import Docente
from schemas.turma_schema import TurmaCreate, TurmaResponse, TurmaUpdate
from core.security import require_admin
from crud import CRUDBase

router = APIRouter(prefix="/turmas", tags=["Turmas"])
turma_crud = CRUDBase(Turma)


@router.post(
    "/",
    response_model=TurmaResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar turma",
)
def criar_turma(dados: TurmaCreate, db: Session = Depends(get_db), logado: dict = Depends(require_admin)):
    """Cria uma turma (disciplina + docente + semestre + vagas). **Restrito a admin.**

    Retorna 404 se a disciplina ou o docente informados não existirem.
    """
    # verificar se o professor existe
    professor_existe = db.query(Docente).filter(Docente.id == dados.docente_id).first()
    if not professor_existe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"professor com Dados {dados.docente_id}, não foi encontrado")

    # verificar se a disciplina existe
    disciplina_existe = db.query(Disciplina).filter(Disciplina.id == dados.disciplina_id).first()
    if not disciplina_existe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"A disciplina com Dados {dados.disciplina_id}, não foi encontrado")

    nova_turma = Turma(
        disciplina_id=dados.disciplina_id,
        docente_id=dados.docente_id,
        semestre=dados.semestre,
        vagas_total=dados.vagas_total,
        vagas_disponiveis=dados.vagas_total,
        codigo=dados.codigo,
    )

    db.add(nova_turma)
    db.commit()
    db.refresh(nova_turma)

    return nova_turma

@router.get("", response_model=List[TurmaResponse])
def listar_turmas(db: Session = Depends(get_db)):
    return turma_crud.get_all(db)

@router.get("/{id}", response_model=TurmaResponse)
def buscar_turma(id: int, db: Session = Depends(get_db)):
    turma = turma_crud.get_by_id(db, id=id)
    if not turma:
        raise HTTPException(status_code=404, detail="Turma não encontrada.")
    return turma

@router.put("/{id}", response_model=TurmaResponse)
def atualizar_turma(id: int, dados: TurmaUpdate, db: Session = Depends(get_db), admin = Depends(require_admin)):
    turma = turma_crud.update(db, id=id, obj_in=dados.model_dump(exclude_unset=True))
    if not turma:
        raise HTTPException(status_code=404, detail="Turma não encontrada.")
    return turma

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_turma(id: int, db: Session = Depends(get_db), admin = Depends(require_admin)):
    if not turma_crud.delete(db, id=id):
        raise HTTPException(status_code=404, detail="Turma não encontrada.")
    return None
