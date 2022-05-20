import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      <Link to='/about'>About</Link>
      {/* <a href='/about'>About</a> */}
    </footer>
  )
}

export default Footer
