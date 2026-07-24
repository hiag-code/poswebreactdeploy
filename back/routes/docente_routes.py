from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.database import get_db
from models.docente_model import Docente
from models.user_model import Usuario
from schemas.docente_schema import DocenteCreate, DocenteResponse, DocenteUpdate
from core.security import hash_password, require_admin
from crud import CRUDBase

router = APIRouter(prefix="/docentes", tags=["Docentes"])
docente_crud = CRUDBase(Docente)


@router.post(
    "/",
    response_model=DocenteResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar docente",
)
def criar_docente(dados: DocenteCreate, db: Session = Depends(get_db), admin_user : dict = Depends(require_admin)):
    """Cadastra um docente e cria o login dele (Usuario com role `docente`).

    Recusa CPF ou email já cadastrado (409).
    """
    # 1. checa CPF ou email duplicado
    if db.query(Docente).filter((Docente.cpf == dados.cpf) | (Docente.email == dados.email)).first():
        raise HTTPException(status_code=409, detail="CPF ou email ja cadastrado")
    if db.query(Usuario).filter(Usuario.email == dados.email).first():
        raise HTTPException(status_code=409, detail="Email ja cadastrado")

    # 2. cria o login (Usuario) com senha em hash, role docente
    usuario = Usuario(
        email=dados.email,
        senha_hash=hash_password(dados.senha),
        role="docente",
    )
    db.add(usuario)
    db.flush()

    # 3. cria o Docente ligado ao login
    docente = Docente(
        nome=dados.nome,
        cpf=dados.cpf,
        titulacao=dados.titulacao,
        email=dados.email,
        usuario_id=usuario.id,
    )
    db.add(docente)
    db.commit()
    db.refresh(docente)
    return docente


@router.get("/", response_model=list[DocenteResponse], summary="Listar docentes")
def listar_docentes(db: Session = Depends(get_db)):
    """Lista todos os docentes cadastrados."""
    return db.query(Docente).all()

@router.get("/{id}", response_model=DocenteResponse)
def buscar_docente(id: int, db: Session = Depends(get_db)):
    docente = docente_crud.get_by_id(db, id=id)
    if not docente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Docente não encontrado"
        )
    return docente

@router.put("/{id}", response_model=DocenteResponse, summary="atualizar dados")
def atualizar_docente(id : int, dados : DocenteUpdate, db: Session = Depends(get_db), admin_user: dict = Depends(require_admin)):
    docente = docente_crud.update(db, id=id, obj_in=dados.model_dump(exclude_unset=True))

    if not docente: 
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Docente não encontrado"
        )

    return docente

@router.delete("/{id}", status_code=status.HTTP_402_PAYMENT_REQUIRED)
def deletar_docente(id: int, db: Session = Depends(get_db), admin : dict = Depends(require_admin)):
    if not docente_crud.delete(db, id=id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Docente não encontrado"
        )

    return None