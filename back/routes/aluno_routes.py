from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session, Query
from typing import Optional

from db.database import get_db
from models.aluno_model import Aluno
from models.user_model import Usuario          # novo para criar o login do aluno (Usuario) no momento da criação do Aluno
from schemas.aluno_schema import AlunoCreate, AlunoResponse, AlunoUpdate
from core.security import hash_password, get_current_user, require_admin        # novo para hashear a senha do aluno no momento da criação do login (Usuario)
from crud import CRUDBase

router = APIRouter(prefix="/alunos", tags=["Alunos"])

aluno_crud = (CRUDBase(Aluno))

@router.post(
    "/",
    response_model=AlunoResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar aluno",
)
def criar_aluno(dados: AlunoCreate, db: Session = Depends(get_db)):
    """Cadastra um aluno e cria o login dele (Usuario com role `estudante`).

    Recusa CPF ou email já cadastrado (409).
    """

    try:
        # 1. checa CPF ou email duplicado aqui
        if db.query(Aluno).filter((Aluno.cpf == dados.cpf) | (Aluno.email == dados.email)).first():
            raise HTTPException(status_code=409, detail="CPF ou email ja cadastrado")
        if db.query(Usuario).filter(Usuario.email == dados.email).first():
            raise HTTPException(status_code=409, detail="Email ja cadastrado")

        # 2. cria o login (Usuario) com a senha em HASH (nao salve a senha em texto puro)
        usuario = Usuario(
            email=dados.email,
            senha_hash=hash_password(dados.senha),
            role="estudante",
        )
        db.add(usuario)
        db.flush()   # preenche o usuario.id sem commitar ainda

        # 3. cria o Aluno ligado ao login
        aluno = Aluno(
            nome=dados.nome,
            cpf=dados.cpf,
            email=dados.email,
            data_nascimento=dados.data_nascimento,
            usuario_id=usuario.id,
        )
        db.add(aluno)
        db.commit()
        db.refresh(aluno)
        return aluno
    
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erro interno ao cadastrar o aluno no banco de dados.")

#buscar aluno por id
#nivel de permissao: qualquer usuario cadastrado
@router.get("/{id}", response_model=AlunoResponse, summary="busca de aluno")
def buscar_aluno(id: int, db: Session = Depends(get_db), current_user : dict = Depends(get_current_user)):
    aluno = aluno_crud.get_by_id(db, id=id)
    if not aluno:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aluno não encontrado"
        )
    return aluno

@router.get("/", response_model=list[AlunoResponse], summary="Listar alunos")
def listar_alunos(db: Session = Depends(get_db)):
    """Lista todos os alunos cadastrados."""
    return db.query(Aluno).all()

@router.put("/{id}", response_model=AlunoResponse, summary="atualizar dados")
def atualizar_aluno(id: int, dados: AlunoUpdate, db : Session = Depends(get_db), current_user : dict = Depends(require_admin)):
    aluno_atualizado = aluno_crud.update(db, id=id, obj_in=dados.model_dump(exclude_unset=True))

    if not aluno_atualizado:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aluno não encontrado"
        )
    
    return aluno_atualizado

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_aluno(id : int, db : Session = Depends(get_db), admin_user : dict = Depends(require_admin)):
    sucesso = aluno_crud.delete(db, id=id)

    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aluno não encontrado"
        )

    return None
