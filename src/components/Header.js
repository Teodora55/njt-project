const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active"><a className="nav-link" href="#books" onClick={props.onChangeToBookPage}>Books</a></li>
				<li className="nav-item active"><a className="nav-link"
					href="#customers" onClick={props.onChangeToCustomerPage}>Customers</a></li>
				<li className="nav-item active"><a className="nav-link" href="#rentals" onClick={props.onChangeToRentalPage}>Book
						rentals</a></li>
			</ul>
		</div>
	</nav>
  );
};

export default Header;
