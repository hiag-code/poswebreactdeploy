from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import get_db
from models.log_model import Log
from schemas.log_schema import LogResponse
from core.security import require_admin

router = APIRouter(prefix="/logs", tags=["Logs"])


@router.get("/", response_model=list[LogResponse])
def listar_logs(
    db: Session = Depends(get_db),
    usuario: dict = Depends(require_admin),
    limite: int = 50,
):
    return db.query(Log).order_by(Log.id.desc()).limit(limite).all()
