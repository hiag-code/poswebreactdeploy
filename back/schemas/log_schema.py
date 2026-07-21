from datetime import datetime
from pydantic import BaseModel, ConfigDict


class LogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    ip: str | None
    rota: str | None
    metodo: str | None
    usuario_id: str | None
    status_code: int | None
    data_hora: datetime | None
