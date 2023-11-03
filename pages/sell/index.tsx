/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
import { Typography, Box, Button, useMediaQuery, IconButton } from '@mui/material';
import { DeleteOutlined, FileDownloadOutlined, InsertDriveFileOutlined, SellOutlined, SendOutlined, UploadOutlined } from '@mui/icons-material';
import FileSaver from 'file-saver';
import emailjs from '@emailjs/browser';
import { useSnackbar } from 'notistack';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { ShopLayout } from '../../components/layouts';
import { file } from '../../utils';
import { storage } from '../../config/firebase';

const SellPage = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [fileName, setFileName] = useState('No hay un archivo seleccionado');

    const { enqueueSnackbar } = useSnackbar();

    const handleFileDownload = () => {
        const dataBlob = file.EXCEL_FILE_BASE64;
        const sliceSize = 1024;
        const byteCharacters = window.atob(dataBlob);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        let byteArrays = new Array (slicesCount);

        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex ) {
            let begin = sliceIndex * sliceSize;
            let end = Math.min (begin + sliceSize, bytesLength);
            let bytes = new Array(end - begin);

            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }

            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }

        let blob = new Blob (byteArrays, { type: "application/vnd.ms-excel" });
        FileSaver.saveAs(new Blob([blob], {}), "FORMATO RECEPCIÓN MERCANCÍA.xlsx");
    }

    const handleFormSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        // Another validation for file
        if (fileInputRef.current?.files?.length === 0) {
            enqueueSnackbar('No se ha subido ningún archivo', {
                variant: 'warning',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });

            return;
        }

        try {
            //Upload file to Firebase storage
            const file = fileInputRef.current!.files![0];
            const fileRef = ref(storage, `files/${uuid()}.xlsx`);
            await uploadBytes(fileRef, file, { contentType: '' });

            const fileUrl = await getDownloadURL(fileRef);
            
            // Send email
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, 
                {
                    file: fileUrl
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            enqueueSnackbar('¡Se ha enviado tu archivo!', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Ha ocurrido un error al enviar tu archivo', {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        }
    };

    return (
        <ShopLayout title='Killer Diller | Vende con Nosotros' pageDescription='Vende tus productos aquí.'>
            <Box
                sx={{
                    mx: 'auto',
                    maxWidth: { sm: '800px' } 
                }}
            >
                <Box display='flex' flexDirection='column'>
                    <Typography variant='h1' component='h1' textAlign={isMobile ? 'center' : 'left'}>
                        <SellOutlined />
                        {' '}
                        Vende con Nosotros
                    </Typography>
                    <Typography variant='h2' sx={{ mb: 3 }}>
                        Ponte en contacto con nosotros para que podamos ayudarte a vender tus productos.
                    </Typography>
                </Box>

                <Box
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography sx={{ mb: 1, display: 'block' }} textAlign={isMobile ? 'left' : 'center'}>
                        1. Descarga el siguiente archivo y llénalo con los datos de tus productos.
                    </Typography>
                    <Button
                        color='primary'
                        className='black-btn'
                        startIcon={<FileDownloadOutlined />}
                        onClick={handleFileDownload}
                        sx={{
                            width: isMobile ? '100%' : 'auto',
                            minWidth: '200px',
                            my: 'auto'
                        }}
                    >
                        Descargar archivo
                    </Button>

                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        ref={formRef}
                        encType='multipart/form-data'
                        onSubmit={handleFormSubmit}
                    >
                        <Typography sx={{ mb: 1, mt: 3, display: 'block' }} textAlign={isMobile ? 'left' : 'center'}>
                            2. Sube y envía el archivo con los datos de tus productos, nosotros te contactaremos después.
                        </Typography>
                        <Button
                            color='primary'
                            variant='outlined'
                            startIcon={<UploadOutlined />}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                                width: isMobile ? '100%' : 'auto',
                                minWidth: '200px',
                                my: 'auto'
                            }}
                        >
                            Subir archivo
                        </Button>
                        <input 
                            ref={fileInputRef}
                            type='file'
                            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' 
                            style={{ display: 'none' }}
                            onChange={({ target: { files }}) => {
                                files && files[0] && setFileName(files[0].name)
                            }}
                            name='my_file'
                        />

                        <Box
                            sx={{
                                margin: '15px 0 0 0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '15px 20px',
                                borderRadius: '5px',
                                bgcolor: '#dadada'
                            }}
                        >
                            <InsertDriveFileOutlined sx={{ mr: '7px' }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: '14px'
                                }}
                            >
                                { fileName }
                                {
                                    fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0] && (
                                        <IconButton
                                            onClick={() => {
                                                fileInputRef.current!.value = '';
                                                setFileName('No hay un archivo seleccionado');
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    )
                                }
                            </Box>
                        </Box>

                        <Button
                            type='submit'
                            color='primary'
                            sx={{
                                width: isMobile ? '100%' : 'auto',
                                minWidth: '200px',
                                my: 'auto',
                                mt: 2
                            }}
                            className='black-btn'
                            startIcon={<SendOutlined />}
                            disabled={fileName === 'No hay un archivo seleccionado'}
                        >
                            Enviar
                        </Button>
                    </form>

                    <Box
                        sx={{
                            mt: 5,
                            height: 'auto'
                        }}
                    >
                        <img
                            src={'https://res.cloudinary.com/killer-diller/image/upload/v1683597422/killer-diller/loader/cr-main.jpg'}
                            alt={'Vende con nosotros'}
                            style={{
                                width: '100%',
                                height: 'auto'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </ShopLayout>
    );
}

export default SellPage;