import { use, useEffect, useState } from "react";
import { api } from "../api/api";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import SidebarAulas from "../components/SideBarAulas";

export default function AulaPlayer() {
  const { id } = useParams();
  const [aula, setAula] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [aulasModulo, setAulasModulo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hidden,setHidden] = useState(true)

  // CONTROLE DO MENU MOBILE
  const [mobileOpen, setMobileOpen] = useState(false);

  // BUSCAR DADOS DA AULA
  useEffect(() => {
    api.get(`/aulas/${id}`)
      .then(res => {
        console.log("aulas",res.data)
        setAula(res.data);

      })
      .catch(err => console.error(err));
  }, [id]);

  useEffect(()=>{
    if(aula){
      api.get(`/aulas/modulo/${aula.moduloId}`)
      .then(res =>{
        console.log("module ",res.data)
        setAulasModulo(res.data)
        
        setLoading(false)
      })
    console.log(aula)
    const url = api.get(`/aulas/${aula.id}/url-video`).then(res =>{
      console.log(res.data) 
      setVideoUrl(res.data)})
      
    } 
    

    
  },[aula])

  if (loading || !aula) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex w-full">

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setMobileOpen(true)}
          className="
            lg:invisible fixed bottom-6 right-6 
            bg-blue-600 text-white font-medium 
            px-5 py-3 rounded-full shadow-lg
          "
        >
          Aulas ▸
        </button  >


      <div className="">
                {/* SIDEBAR RESPONSIVA */}
        <SidebarAulas
          aulas={aulasModulo}
          aulaAtualId={Number(id)}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          hidden={hidden}
        />
      </div>


        {/* PLAYER */}
        
        <div className="flex-1 pr-6 ">
          <h1 className="text-3xl font-bold mb-4">{aula.titulo}</h1>

          <div className="bg-black rounded-lg overflow-hidden shadow-lg mb-6 lg:max-w-250">
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                src={`${videoUrl}`}
                controls
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
              />
            </div>
          </div>

          {aula.descricao && (
            <p className="text-gray-300">{aula.descricao}</p>
          )}
        </div>


      </div>
    </Layout>
  );
}
