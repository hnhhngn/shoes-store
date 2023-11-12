import logo200Image from '../../../assets/logo.png';
import sidebarBgImage from '../../../assets/images/sidebar.jpg';
import SourceLink from './SourceLink';
import React from 'react';
import {
  MdAccountCircle,
  MdBorderAll,
  MdDashboard,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdRadioButtonChecked,
  MdWeb,
  MdWidgets,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from './bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  { to: '/chartdoanhthu', name: 'Doanh Thu', exact: false, Icon: MdRadioButtonChecked },
  { to: '/chartproduct', name: 'Sản Phẩm', exact: false, Icon: MdRadioButtonChecked },
  { to: '/chartorder', name: 'Đơn Hàng', exact: false, Icon: MdRadioButtonChecked }
 
];

const accComponents = [
  { to: '/createaccount', name: 'Tạo Tài Khoản', exact: false, Icon: MdRadioButtonChecked },
  { to: '/changepassword', name: 'Đổi Mật Khẩu', exact: false, Icon: MdRadioButtonChecked }
];


const navItems = [
  { to: '/product', name: 'product', exact: true, Icon: MdBorderAll },
  { to: '/order', name: 'order', exact: false, Icon: MdWeb },
  { to: '/category', name: 'category', exact: false, Icon: MdWidgets },
  { to: '/discount', name: 'discount', exact: false, Icon: MdWidgets },
  { to: '/repository', name: 'repository', exact: false, Icon: MdBorderAll }
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    isOpenContents: false,
    isOpenPages: false,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="120"
                height="110"
                className="pr-2"
                alt=""
                
              />
              <span className="text-white">
                SHOPSHOES 
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon style={{color:'white',width:40}} className={bem.e('nav-item-icon')} />
                  <span className="" style={{color:'white',fontSize:16}}>{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdInsertChart style={{marginTop:5,width:40}}  className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start" style={{fontSize:16}}>THỐNG KÊ</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon style={{color:'white',width:40,marginLeft:10}} className={bem.e('nav-item-icon')} />
                    <span style={{color:'white',fontSize:16}} className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contents')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdAccountCircle  style={{marginTop:5,width:40}}  className={bem.e('nav-item-icon')} />
                  <span className="" style={{fontSize:16}}>ACCOUNT</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenContents}>
              {accComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon style={{color:'white',width:40,marginLeft:10}} className={bem.e('nav-item-icon')} />
                    <span style={{color:'white',fontSize:16}}  className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}
export default Sidebar;
