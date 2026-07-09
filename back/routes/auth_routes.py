from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.database import get_db
from models.user_model import Usuario
from schemas.auth_schema import LoginRequest, TokenResponse
from core.security import verify_password, create_access_token

router = APIRouter(tags=["Autenticação"])


@router.post("/login", response_model=TokenResponse, summary="Fazer login")
def login(dados: LoginRequest, db: Session = Depends(get_db)):
    """Autentica o usuário (email + senha) e devolve um **token JWT**.

    Cole o token no botão **Authorize** (o cadeado, no topo) pra acessar as rotas protegidas.
    """
    # busca o usuário pelo email
    usuario = db.query(Usuario).filter(Usuario.email == dados.email).first()

    # se não existe OU a senha não bate -> 401 (mesma mensagem pros dois,
    # pra não revelar se o email existe)
    if not usuario or not verify_password(dados.senha, usuario.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
        )

    # gera o token JWT com o id e a role do usuário
    token = create_access_token(user_id=usuario.id, role=usuario.role)
    return TokenResponse(access_token=token)
