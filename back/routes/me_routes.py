from fastapi import APIRouter, Depends
from core.security import get_current_user

router = APIRouter(tags=["Eu"])


@router.get("/me", summary="Quem sou eu")
def quem_sou_eu(usuario: dict = Depends(get_current_user)):
    """Devolve o `id` e a `role` do usuário logado (lidos do token). Útil pra conferir se a autenticação está funcionando."""
    return usuario
