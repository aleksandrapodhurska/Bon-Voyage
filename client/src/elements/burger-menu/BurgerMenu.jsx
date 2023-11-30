import { slide as Menu } from 'react-burger-menu';
import './burger-menu.css'

const BurgerMenu = ({isOpen, handleIsOpen, submit, children}) => {

	return (
		<Menu right width={180}
			isOpen={isOpen}
			onOpen={handleIsOpen}
			onClose={handleIsOpen}>
			{children}
			<a onClick={submit}>Logout</a>
		</Menu>
		)
}

export default BurgerMenu