import './App.css'
import { useEffect, useState } from 'react'

const URL_PREFIX_CAT = 'https://cataas.com'
function App () {
  const [img, setImg] = useState()
  const [text, setText] = useState()
  const [buscar, setBuscar] = useState(false)

  useEffect(() => {
    if (!buscar) return

    console.log('valor de buscar ', buscar)
    fetch(`https://cataas.com/cat/says/${text}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImg(url)
        setBuscar(!buscar)
      })
  }, [buscar])

  const buscarCat = (e) => {
    setText(e.target.value)
  }

  return (

    <main>
      <h1>Creador de imagenes de gatos</h1>
      <section>
        <input placeholder='ingrese algo' id='word' onChange={buscarCat} />
        <button onClick={() => {
          console.log('valor anterior a buscar :', buscar)
          setBuscar(!buscar)
          document.getElementById('word').value = ''
          setImg('')
        }}
        >buscar
        </button>
      </section>
      {!img && buscar && <div className='spinner'> </div>}
      {img && <img src={`${URL_PREFIX_CAT}${img}`} />}
    </main>
  )
}

export default App
