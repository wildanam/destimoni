function Header(props) {
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={props.logoURL} alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-2" />
                        <div className="d-inline-block align-text-top">Destimoni</div>
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Header