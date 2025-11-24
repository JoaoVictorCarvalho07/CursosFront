import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import CursoDetalhe from "./pages/CursoDetalhe";
import AulaPlayer from "./pages/AulaPlayer";
import Register from "./pages/Register";
import PrivateRoute from "./router/PrivateRoute";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import MeusCursos from "./pages/MeusCursos";
import AdminRoute from "./router/AdminRoute";
import AdminCursos from "./pages/admin/AdminCursos";
import AdminModulos from "./pages/admin/AdminModulos";
import AdminAulas from "./pages/admin/AdminAulas";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/curso/:id" element={<PrivateRoute><CursoDetalhe /></PrivateRoute>} />
        <Route path="/aula/:id" element={<PrivateRoute><AulaPlayer /></PrivateRoute>} />
        <Route path="/cursos" element={<PrivateRoute><Cursos /></PrivateRoute>}/>

        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />


        <Route path="/meus-cursos"element={<PrivateRoute><MeusCursos /></PrivateRoute>}/>
        {/* <Route path="/admin" element={<AdminRoute><PaginaAdmin /></AdminRoute>}/> */}


        <Route
  path="/admin/cursos"
  element={
    <AdminRoute>
      <AdminCursos />
    </AdminRoute>
  }
/>


<Route
  path="/admin/modulos"
  element={
    <AdminRoute>
      <AdminModulos />
    </AdminRoute>
  }
/>

<Route
  path="/admin/aulas"
  element={
    <AdminRoute>
      <AdminAulas />
    </AdminRoute>
  }
/>



        </Routes>
        </BrowserRouter>);
}

export default App;

