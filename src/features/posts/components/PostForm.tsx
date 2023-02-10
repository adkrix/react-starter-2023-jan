import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button, CircularProgress, Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { PostAttributes } from 'features/posts/types';
import FormTextField from 'libs/ui/components/FormTextField';

export type PostFormProps = {
  defaultValues?: PostAttributes;
  isCreating: boolean;
  onSubmitClick(data: PostAttributes): void;
};

const PostForm = (props: PostFormProps) => {
  const { t } = useTranslation();

  const {
    defaultValues = {
      title: '',
      content: '',
      description: '',
    },
    isCreating,
    onSubmitClick,
  } = props;

  const newPostValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required(t('home.form.validation.title-required'))
      .max(20, t('home.form.validation.title-max', { num: 20 })),
    description: Yup.string().required(t('home.form.validation.description-required')),
    content: Yup.string().required(t('home.form.validation.content-required')),
  });

  const methods = useForm<PostAttributes>({
    defaultValues,
    resolver: yupResolver(newPostValidationSchema),
  });
  const { handleSubmit, reset, control } = methods;

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <FormTextField name="title" label={t('home.form.title')} control={control} />
      <FormTextField multiline={2} name="description" label={t('home.form.description')} control={control} />
      <FormTextField multiline={5} name="content" label={t('home.form.content')} control={control} />
      <Button onClick={handleSubmit(onSubmitClick)} variant={'contained'} disabled={isCreating}>
        {isCreating ? <CircularProgress color={'secondary'} size={24} /> : t('home.buttons.submit')}
      </Button>
      <Button onClick={() => reset()} variant={'outlined'}>
        {t('home.buttons.reset')}
      </Button>
    </Stack>
  );
};

export default PostForm;
