import Subtitulo_branco from '../Subtitulo_branco';
import Titulo_branco from '../Titulo_branco';
import fundoTopo from '../../assets/imagens/fundotopo.png';

export default function Hero() {
  return (
    <section 
      className="text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fundoTopo})` }}
    >

      <div className="px-6 py-12 md:pl-40 md:py-20 flex flex-col gap-6 md:gap-8 items-start max-w-7xl mx-auto">

        {/* Badge */}
        <a
          href="#"
          className="inline-flex bg-white/20 text-white rounded-full px-4 py-1 text-sm md:text-base"
        >
          Especialização Lato Sensu
        </a>

        {/* Título */}
        <Titulo_branco>
          Pós-Graduação em Desenvolvimento Web
        </Titulo_branco>

        {/* Subtítulo */}
        <Subtitulo_branco>
          Forme-se como especialista em tecnologias web modernas. Aprenda com os melhores professores do IFBA e desenvolva projetos práticos que farão diferença no mercado.
        </Subtitulo_branco>

        {/* Botões: Empilham no celular (flex-col) e ficam lado a lado no PC (sm:flex-row) */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto">
          <button className="bg-white text-green-700 py-3 px-7 rounded-lg font-bold hover:bg-gray-300 transition text-center">
            Inscreva-se Agora
          </button>
          <button className="text-white border-2 py-3 px-7 rounded-lg font-bold hover:bg-white/20 transition text-center">
            Saiba Mais
          </button>
        </div>

        <section className="flex flex-wrap gap-6 sm:gap-8 text-white pt-2">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl sm:text-3xl font-bold">18</h1>
            <p className="text-sm sm:text-base">Meses de Duração</p>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl sm:text-3xl font-bold">360h</h1>
            <p className="text-sm sm:text-base">Carga Horária</p>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl sm:text-3xl font-bold">100%</h1>
            <p className="text-sm sm:text-base">Empregabilidade</p>
          </div>
        </section>

      </div>
    </section>
  );
}