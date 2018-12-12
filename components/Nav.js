import Link from 'next/link';

const Nav = () => (
   <div>
       <nav>
           <ul>
            <li><Link href="/index"><a>Home</a></Link></li>
            <li><Link href="/news"><a>News</a></Link></li>
            <li><Link href="/business"><a>Business</a></Link></li>
            <li><Link href="/sport"><a>Sport</a></Link></li>
           </ul>
       </nav>
       <style jsx>{`
        nav {
            max-width: 100%;
            background: silver;
            border: 1px solid #ccc;
            border-right: none;
            margin: 1em;
        }


        nav ul {
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            list-style: none;
            float: left;
            flex-grow: 1;
            text-align: center;
            border-left: 1px solid #fff;
            border-right: 1px solid #ccc;
            width: 16.6667%; 
            width: calc(100% / 6);
            box-sizing: border-box;
        }

        nav ul li:first-child {
            border-left: none;
        }

        nav ul li a {
            font-size: 0.8em;
            display: block;
            text-decoration: none;
            color: black;
            padding: 5px 0;
        }

        nav ul li:hover {
            background: black;
        }
        nav ul li a:hover {
            color: white;
        }

        `}</style>
   </div> 
)

export default Nav;

