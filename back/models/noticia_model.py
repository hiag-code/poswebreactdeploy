from sqlalchemy import Column, Integer, String, Text
from db.database import Base


class Noticia(Base):
    __tablename__ = "noticias"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=False)
    link = Column(String(500), nullable=False)
    imagem_url = Column(String(500), nullable=True)   # opcional — URL da imagem hospedada em nuvem (S3/Firebase)
