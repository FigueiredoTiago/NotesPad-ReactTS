import styles from "./styles.module.css";
import LoginModal from "../../components/LoginModal/index";
import RegisteModal from "../../components/RegisterModal/index";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useAuth from "../../hooks/userAuth";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { testApi } from "../../api/api";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redireciona para o dashboard se o token existir
    }
  }, [isAuthenticated, navigate]);

  const { data } = useQuery(["refetch"], () => testApi(), {
    staleTime: 1000 * 60 * 19,
    retry: true,
    onSuccess: () => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });


  return (
    <section className={styles.homeContainer}>
      <nav className={styles.home_nav}>
        <LoginModal />
        <RegisteModal />
      </nav>

      <ToastContainer />
    </section>
  );
};

export default Home;
