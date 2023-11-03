import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Fab, Tooltip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ShopLayout } from "../components/layouts";
import { Banner, Loader } from "../components/ui";
import { ProductsSlider } from "../components/products";
import { EventSection } from "../components/events";
import { useProducts } from "../hooks";
import { UIContext } from "../context";
import { IEvent } from "../interfaces";
import { dbEvents } from "../database";
import { SellOutlined } from "@mui/icons-material";

type Props = {
  events: IEvent[];
};

const defaultEvent = {
  title: "Eventos",
  description:
    "Encuentra los mejores eventos aquí, sigue nuestra página para que no te los pierdas.",
  image:
    "https://res.cloudinary.com/killer-diller/image/upload/v1683597421/killer-diller/loader/cr-image-2.jpg",
};

const HomePage: NextPage<Props> = ({ events }: Props) => {
  const event1 = events[0] || defaultEvent;
  const event2 = events[1] || defaultEvent;

  const { isApplicationLoaded, setIsApplicationLoaded } = useContext(UIContext);

  useEffect(() => {
    !isApplicationLoaded
      ? document.querySelector("body")!.classList.add("loading")
      : document.querySelector("body")!.classList.remove("loading");
  }, [isApplicationLoaded]);

  useEffect(() => {
    if ((window.location.hash = "#_=_")) {
      window.location.hash = "";
      history.pushState("", document.title, window.location.pathname);
    }
  });

  const { products } = useProducts("/products");

  return !isApplicationLoaded ? (
    <motion.div key="loader">
      <Loader setIsApplicationLoaded={setIsApplicationLoaded} />
    </motion.div>
  ) : (
    <AnimatePresence>
      <ShopLayout
        title="Killer Diller | Inicio"
        pageDescription="Encuentra los mejores productos aquí."
      >
        <motion.video
          initial={{
            opacity: 0,
            y: 50,
            z: 200,
          }}
          animate={{
            opacity: 1,
            y: 0,
            z: 0,
            transition: {
              ease: "easeOut",
              duration: 1,
            },
          }}
          transition={{
            ease: "easeOut",
          }}
          layoutId="main-image"
          style={{
            width: "100%",
            maxHeight: "700px",
            objectFit: "cover",
          }}
          autoPlay
          loop
          muted
          playsInline
          poster="https://res.cloudinary.com/killer-diller/image/upload/v1683597422/killer-diller/loader/cr-main.jpg"
        >
          <source
            src="https://res.cloudinary.com/killer-diller/video/upload/v1683597469/killer-diller/loader/banner.mp4"
            type="video/mp4"
          />
          <source
            src="https://res.cloudinary.com/killer-diller/video/upload/v1683597469/killer-diller/loader/banner.mp4"
            type="video/ogg"
          />
        </motion.video>

        <Banner />

        <ProductsSlider rows={2} products={products} />

        <EventSection event={event1} />

        <ProductsSlider rows={3} products={products} />

        <EventSection event={event2} />

        <ProductsSlider rows={1} products={products} />

        <SellWithUsFab />
        <WhatsAppFab />
      </ShopLayout>
    </AnimatePresence>
  );
};

const WhatsAppFab = () => {
  const number = "+524774409975";
  const message =
    "Hola, quiero conocer más acerca de los productos de Killer Diller.";

  return (
    <Fab
      color="primary"
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
      href={`https://api.whatsapp.com/send?phone=${number}&text=${encodeURI(
        message
      )}&app_absent=0`}
      target="blank"
    >
      <WhatsAppIcon />
    </Fab>
  );
};

const SellWithUsFab = () => {
  const router = useRouter();

  return (
    <Tooltip title="Vende con nosotros">
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 1000,
        }}
        onClick={() => router.push("/sell")}
      >
        <SellOutlined />
      </Fab>
    </Tooltip>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const events = await dbEvents.getEvents();

  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
    },
  };
};

export default HomePage;
