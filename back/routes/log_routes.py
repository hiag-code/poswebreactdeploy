from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from db.database import get_db
from models.log_model import Log
from schemas.log_schema import LogResponse
from core.security import require_admin

router = APIRouter(prefix="/logs", tags=["Logs"])


@router.get(
    "/",
    response_model=list[LogResponse],
    summary="Listar logs de auditoria",
)
def listar_logs(
    db: Session = Depends(get_db),
    usuario: dict = Depends(require_admin),
    limite: int = 50,
):
    """Lista os logs de auditoria (ações que modificaram dados). **Restrito a admin.**

    Use `?limite=N` pra controlar quantos registros vêm (mais recentes primeiro).
    """

    try:
        return db.query(Log).order_by(Log.id.desc()).limit(limite).all()
    
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Erro interno ao buscar a lista de logs.")