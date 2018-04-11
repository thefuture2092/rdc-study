// Vendor
import React from 'react';
import T from 'prop-types';
import {IntlProvider, addLocaleData} from 'react-intl';
import classnames from 'classnames';
import fr from 'react-intl/locale-data/fr';

// Locale
import messages from '../../locales/fr.json';

// Styles
import '../../assets/styles/main.scss';
import styles from './styles.module.scss';

// Components
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import SEO from '../../components/SEO';

addLocaleData(fr);

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false
    };

    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }

  handleToggleMenu() {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    });
  }

  render() {
    const {children, footerClassName, headerWithTitle, pageWrapperClassName} = this.props;
    const pageWrapperMenuVisibilityClassName = this.state.isMenuVisible ? styles['page-wrapper--menu-visible'] : null;

    return (
      <IntlProvider locale="fr" messages={messages}>
        <div>
          <div className={classnames(styles['page-wrapper'], pageWrapperMenuVisibilityClassName, pageWrapperClassName)}>
            <SEO />
            <Header withTitle={headerWithTitle} onToggleMenu={this.handleToggleMenu} />
            {children}
            <Footer className={footerClassName} />
          </div>

          <Menu onToggleMenu={this.handleToggleMenu} isVisible={this.state.isMenuVisible} />
        </div>
      </IntlProvider>
    );
  }
}

TemplateWrapper.propTypes = {
  children: T.oneOfType([T.arrayOf(T.element), T.element]).isRequired,
  footerClassName: T.string,
  headerWithTitle: T.bool,
  pageWrapperClassName: T.string
};

export default TemplateWrapper;
