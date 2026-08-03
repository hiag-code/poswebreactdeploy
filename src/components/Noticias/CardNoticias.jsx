import { Link } from "react-router-dom";
import ImagemNoticias from "./ImagemNoticias";
import MetaNoticias from "./MetaNoticias";
import TituloNoticias from "./TituloNoticias";
import TextoNoticias from "./TextoNoticias";

export default function CardNoticias({ noticia }) {
  return (
    <Link
      to={`/noticias/${noticia.id}`}
      className="flex flex-col group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    >
      <article className="flex flex-col">
        <ImagemNoticias src={noticia.imagem} alt={noticia.alt} />

        <MetaNoticias
          data={noticia.data}
          categoria={noticia.categoria}
        />

        <div className="group-hover:text-green-700 transition-colors">
          <TituloNoticias>
            {noticia.titulo}
          </TituloNoticias>
        </div>

        <TextoNoticias>
          {noticia.descricao}
        </TextoNoticias>
      </article>
    </Link>
  );
}