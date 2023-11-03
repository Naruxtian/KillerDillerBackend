/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import styles from "./Loader.module.css";

type Props = {
    setIsApplicationLoaded: () => void;
};

const container = {
    show: {
        transition: {
            staggerChildren: 0.35,
        },
    }
};

const item = {
    hidden: { 
        opacity: 0, 
        y: 200 
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeInOut',
            duration: 1.5,
        },
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: {
            ease: 'easeInOut',
            duration: 1,
        },
    }
};

export const Loader = ({ setIsApplicationLoaded }: Props) => {
    return (
        <motion.div className={styles.loader}>
            <motion.div
                variants={container}
                onAnimationComplete={() => setIsApplicationLoaded()}
                initial="hidden"
                animate="show"
                exit="exit"
                className={styles['loader-inner']}
            >
                <motion.div 
                    initial={{
                        opacity: 0,
                        y: 200
                    }}
                    animate={{
                        opacity: 1,
                        y: [0, -100],
                        transition: {
                            ease: 'easeInOut',
                            duration: 1.5,
                        }
                    }}
                    exit={{
                        y: -200,
                        transition: {
                            ease: 'easeIn',
                            duration: 1,
                        }
                    }}
                    transition={{
                        ease: 'easeInOut'
                    }}
                    className={styles['transition-image']}
                >
                    <motion.img
                        className={styles['main-image']}
                        layoutId="main-image"
                        src="https://res.cloudinary.com/killer-diller/image/upload/v1683597422/killer-diller/loader/cr-main.jpg"
                        alt="Transition Image"
                    />
                </motion.div>

                <ImageBlock posX={70} posY={15} variants={item} id="image-2" />
                <ImageBlock posX={20} posY={40} variants={item} id="image-1" />
                <ImageBlock posX={10} posY={15} variants={item} id="image-2" />
                <ImageBlock posX={60} posY={50} variants={item} id="image-1" />
            </motion.div>
        </motion.div>
    );
};

const ImageBlock = ({ posX, posY, variants, id }: any) => {
    return (
        <motion.div
            variants={variants}
            className={`${styles['image-block']} ${id}`}
            style={{
                top: `${posY}vh`,
                left: `${posX}vw `,
            }}
        >
            <img
                src={`https://res.cloudinary.com/killer-diller/image/upload/v1683597422/killer-diller/loader/cr-${id}.jpg`}
                alt={id}
            />
        </motion.div>
    );
};
