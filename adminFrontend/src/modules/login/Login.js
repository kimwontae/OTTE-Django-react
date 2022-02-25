import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loginUser} from '@store/reducers/auth';
import {Checkbox, Button, Input} from '@components';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';

import * as Yup from 'yup';

import * as AuthService from '../../services/auth';

const Login = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();
    const [t] = useTranslation();

    const login = async (email, password) => {
        try {
            setAuthLoading(true);
            const token = await AuthService.loginByAuth(email, password);
            toast.success('Login is succeed!');
            setAuthLoading(false);
            dispatch(loginUser(token));
            history.push('/');
        } catch (error) {
            setAuthLoading(false);
            toast.error(error.message || 'Failed');
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
        }),
        onSubmit: (values) => {
            login(values.email, values.password);
        }
    });

    document.getElementById('root').classList = 'hold-transition login-page';

    return (
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <b>OTTE</b>
                        <span>admin</span>
                    </Link>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">{t('관리자 페이지 로그인')}</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <Input
                                icon={faEnvelope}
                                placeholder="Email"
                                type="email"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps('email')}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                icon={faLock}
                                placeholder="Password"
                                type="password"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps(
                                    'password'
                                )}
                            />
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <Checkbox
                                    checked={false}
                                    label={t('login.label.rememberMe')}
                                />
                            </div>
                            <div className="col-4">
                                <Button
                                    block
                                    type="submit"
                                    isLoading={isAuthLoading}
                                >
                                    {t('로그인')}
                                </Button>
                            </div>
                        </div>
                    </form>

                    <p className="mb-0">
                        <Link to="/register" className="text-center">
                            {t('회원가입하기')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
