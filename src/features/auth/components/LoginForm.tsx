import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button, Stack, Container } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { LoginFormInput } from 'features/auth/types';
import FormTextField from 'libs/ui/components/FormTextField';
import { defaultUserEmail, defaultUserPassword } from 'test/msw/default';

export type LoginFormProps = {
  defaultValues?: LoginFormInput;
  onSubmitClick(data: LoginFormInput): void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { t } = useTranslation();

  const {
    defaultValues = {
      identifier: '',
      password: '',
    },
    onSubmitClick,
  } = props;

  const newPostValidationSchema = Yup.object().shape({
    identifier: Yup.string()
      .required(t('home.form.validation.identifier-required'))
      .max(20, t('home.form.validation.identifier-max', { num: 30 })),
    password: Yup.string().required(t('login.form.validation.password-required')),
  });

  const methods = useForm<LoginFormInput>({
    defaultValues,
    resolver: yupResolver(newPostValidationSchema),
  });
  const { handleSubmit, control } = methods;

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <Container>
        Use `{defaultUserEmail}` and `{defaultUserPassword}`
      </Container>
      <FormTextField name="identifier" label={t('login.form.identifier')} control={control} />
      <FormTextField
        name="password"
        type="password"
        label={t('login.form.password')}
        control={control}
      />
      <Button onClick={handleSubmit(onSubmitClick)} variant={'contained'}>
        {t('login.buttons.login')}
      </Button>
    </Stack>
  );
};
