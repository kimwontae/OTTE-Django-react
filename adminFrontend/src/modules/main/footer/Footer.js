import React from 'react';
import {useTranslation} from 'react-i18next';
import {DateTime} from 'luxon';
import {version} from '../../../../package.json';

const Footer = () => {
    const [t] = useTranslation();

    return (
        <footer className="main-footer">
            <strong>
                <span>Copyright © {DateTime.now().toFormat('y')} </span>
                <a
                    href="https://www.youtube.com/channel/UCV1kjYsup5T_DZx2lLlS1CA"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Kosmo_Team1
                </a>
                <span>.</span>
            </strong>
            <div className="float-right d-none d-sm-inline-block">
                <b>{t('footer.version')}</b>
                <span>&nbsp;{version}</span>
            </div>
        </footer>
    );
};

export default Footer;
