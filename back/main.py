from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
from core.security import JWT_SECRET, JWT_ALGORITHM
from db.database import SessionLocal
from models.log_model import Log
# importa todos os models pra registrar no SQLAlchemy (os relacionamentos precisam de todos)
import models.user_model
import models.aluno_model
import models.docente_model
import models.disciplina_model
import models.turma_model
import models.matricula_model
import models.log_model

from routes import aluno_routes, auth_routes, docente_routes, me_routes, disciplina_routes, turma_routes, relatorio_routes, matricula_routes, log_routes

app = FastAPI(
    title="API Pós-Graduação IFBA",
    description=(
        "Backend do sistema de gestão da pós-graduação em Sistemas Web Back-end "
        "(IFBA — Grupo 5). Autenticação JWT, cadastros, matrículas, relatórios e auditoria.\n\n"
        "Para testar rotas protegidas: faça **POST /login**, copie o `access_token` e clique em **Authorize**."
    ),
    version="1.0.0",
)

# CORS — libera o front-end a conversar com a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://djansantos.com.br",   # produção
        "http://localhost:5173",       # Vite em dev (React)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_auditoria(request: Request, call_next):
    # 1 deixa a requisicao rodar e pega a resposta
    response = await call_next(request)

    # 2 so audita acoes que MODIFICAM
    if request.method in ("POST", "PUT", "PATCH", "DELETE"):
        # 3 descobre o usuario pelo token (na mao, middleware nao usa Depends)
        usuario_id = None
        auth = request.headers.get("Authorization")
        if auth and auth.startswith("Bearer "):
            try:
                payload = jwt.decode(auth[7:], JWT_SECRET, algorithms=[JWT_ALGORITHM])
                usuario_id = payload.get("sub")
            except JWTError:
                pass

        # 4 salva o log (sessao criada na mao)
        db = SessionLocal()
        try:
            db.add(Log(
                ip=request.client.host,
                rota=request.url.path,
                metodo=request.method,
                usuario_id=usuario_id,
                status_code=response.status_code,
            ))
            db.commit()
        finally:
            db.close()

    return response

# essa parte liga as rotas na aplicação
app.include_router(auth_routes.router)
app.include_router(aluno_routes.router)
app.include_router(docente_routes.router)
app.include_router(me_routes.router)
app.include_router(disciplina_routes.router)
app.include_router(turma_routes.router)
app.include_router(relatorio_routes.router)
app.include_router(matricula_routes.router)
app.include_router(log_routes.router)

@app.get("/")
def home():
    return "minha api"
