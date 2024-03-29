import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Memes({ memes }) {
  const ListElements = memes.map(mem => (
    <li key={mem.id}>
      <Link href={`/memes/${mem.id}`}>
        <a>{mem.name}</a>
      </Link>
    </li>
  ))

  const { back } = useRouter()

  return(
    <>
      <button onClick={back}>Back to main page</button>
      <h1>memy</h1>
      <ul>
        {ListElements}
      </ul>
    </>
  )
}

export const getServerSideProps = async() => {
  const response = await fetch('https://api.imgflip.com/get_memes')
  const { data, success } = await response.json()

  if (!success) {
    return {
      redirect: {
        destination: '/',
        permament: false,
      }
    }
  }

  const { memes } = data

  return{
    props: {
      memes,
    }
  }

}