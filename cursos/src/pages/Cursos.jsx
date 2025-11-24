import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Loader from "../components/Loader";
import CursoCard from "../components/CursoCard";

export default function Cursos() {

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    api.get("/cursos")
      .then(res => {
        setCursos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  

if (loading) {
  return (
    <Layout>
      <Loader />
    </Layout>
  );
}

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Cursos disponíveis</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map(curso => (
          <CursoCard key={curso.id} curso={curso} />
        ))}
      </div>
    </Layout>
  );
}
