

const Footer = props => {
    const date = new Date();
  return (
    <footer className="mt-auto main-bg-color">
        <p className="text-end text-white mx-4 mb-0 py-3">copyright {String.fromCharCode(169)} {date.getFullYear()} Websites &apos;r&apos; us</p>
    </footer>
  )
}

Footer.propTypes = {}

export default Footer