import React from 'react';
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { SliderProductCard } from '.';
import styles from './ProductsSlider.module.css';
import { IProduct } from '../../interfaces';
import { slice } from '../../utils';

type Props = {
  products: IProduct[];
  rows: number;
  title?: string;
};

export const ProductsSlider = ({ products, rows, title = 'LO MEJOR PARA TI' }: Props) => {
  const chunkedArray: IProduct[][] = slice.sliceIntoChunks(products, rows);

  return (
    <>
      <Typography 
        variant="h2"
        sx={{
          fontSize: { xs: '30px', sm: '6vw' },
          textAlign: { xs: 'center', sm: 'left' },
          marginTop: '20px'
        }}
      >
        {title}
      </Typography>
      {
        chunkedArray.map((array, index) => (
          <Swiper
            key={index}
            className={styles.slider}
            slidesPerView={'auto'}
            spaceBetween={30}
            freeMode={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: true
            }}
            modules={[Autoplay, FreeMode]}
          >
            {
              array?.map((product, index) => (
                <SwiperSlide key={index} className={styles.slider__slide}>
                  <SliderProductCard product={product} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ))
      }
    </>
  );
};