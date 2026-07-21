from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from db.database import Base


class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String(50))
    rota = Column(String(255))
    metodo = Column(String(10))
    usuario_id = Column(String(50), nullable=True)   # nulo se a acao nao tinha login
    status_code = Column(Integer)
    data_hora = Column(DateTime, server_default=func.now())