from sqlalchemy import Column, Integer, String, Text
from db.database import Base


class Edital(Base):
    __tablename__ = "editais"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=False)
    link = Column(String(500), nullable=False)
