import { Header } from "./components/header"
import GetShortURLButton from "./components/getShortURLButton"
import URLCard from "./components/urlCard"
import styles from "./global.module.css"
import { Input, useToast } from "@chakra-ui/react"
import { useState, ChangeEvent, FormEvent } from "react"

function App() {
  const [success, setSuccess] = useState(false)
  const [URL, setURL] = useState("")
  const [value, setValue] = useState("")
  const toast = useToast()
  const apiEndPoint = process.env.REACT_APP_BACKEND_API_ENDPOINT

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const res = await fetch(`${apiEndPoint}/get-shortened-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: value,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      toast({
        title: "Success",
        description: "The URL has been successfully shortened.",
        status: "success",
        duration: 2500,
        isClosable: false
      })
      setSuccess(true)
      setURL(data.shortenedURL)
      console.log(data.shortenedURL)
    } else if (res.status === 400) {
      toast({
        title: "Error",
        description: "Please give a valid URL.",
        status: "error",
        duration: 2500,
        isClosable: false
      })
      setSuccess(false)
      setURL("")
    } else {
      toast({
        title: "Error",
        description: "An unknown error occurred.",
        status: "error",
        duration: 2500,
        isClosable: false
      })
      setSuccess(false)
      setURL("")
    }

  }

  return (
    <div className={styles["body"]}>
      <div className={styles["header-container"]}>
        <Header />
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          className={styles["input-url"]}
          placeholder="Enter your URL"
          value={value}
          onChange={handleChange}
        />
        <div className={styles["button-container"]}>
          <GetShortURLButton onSubmit={handleSubmit} />
        </div>
      </form>
      {success && <URLCard url = {URL}/>}
    </div>
  )
}

export default App