import React, { useContext } from 'react';
import { Autocomplete, Box, Button, Chip, TextField, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SaveAsOutlined } from '@mui/icons-material';
import { IUser } from '../../interfaces';
import { AuthContext } from '../../context';

type Props = {
    user: IUser;
    tags?: string[];
};

type FormData = {
    tags: string[];
};

export const TagsForm = ({ user, tags }: Props) => {
    const { _id: userId, tags: userTags } = user;

    const isMobile = useMediaQuery('(max-width: 600px)');

    const { updateUser } = useContext(AuthContext);

    const { handleSubmit, setValue } = useForm<FormData>({
        defaultValues: {
            tags: userTags || []
        }
    });

    const handleFormSubmit = async (data: FormData) => {
        updateUser(userId, data);
    };

    return (
        <Box
            sx={{
                mt: 3
            }}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Autocomplete
                    multiple
                    limitTags={isMobile ? 1 : 5}
                    options={tags || []}
                    defaultValue={userTags || []}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField {...params} label="Tags" variant='filled' />
                    )}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <Chip
                                label={option}
                                {...getTagProps({ index })}
                                color="primary"
                                size='small'
                                sx={{ ml: 1, mt: 1 }}
                            />
                        ))
                    }
                    onChange={(event, value) => setValue('tags', value, { shouldValidate: true })}
                    disableClearable
                />

                <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
                    <Button 
                        color='primary' 
                        className='circular-btn black-btn'
                        size='large' 
                        type='submit'
                        startIcon={<SaveAsOutlined />}
                    >
                        Guardar cambios
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
